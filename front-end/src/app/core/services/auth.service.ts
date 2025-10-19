import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { BehaviorSubject, catchError, filter, finalize, tap, throwError, take, map } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthResponseData, User } from './auth.model';
import { TokenService } from './token.service';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enteredEmail = signal<string>('');
  private refreshInProgress = signal(false);
  isAuthenticated = signal(false);

  private refreshSubject = new BehaviorSubject<string | null>(null);
  user$ = new BehaviorSubject<User | null>(null);

  private baseUrl = environment.apiBaseUrl;

  private accessTokenExpirationTimer: any;
  private refreshTokenTimer: any;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private cryptoService = inject(CryptoService);

  automaticallySetEnteredMailToLoginField(email: string) {
    this.enteredEmail.set(email);
  }

  signup(signupCredentials: { firstName: string, lastName: string, email: string, mobile: string, password: string }) {
    return this.httpClient.post<{ status: string, message: string }>(`${this.baseUrl}/auth/signup`, {
      first_name: signupCredentials.firstName,
      last_name: signupCredentials.lastName,
      email: signupCredentials.email,
      phone: signupCredentials.mobile,
      password: signupCredentials.password
    }).pipe(
      catchError(this.handleError)
    );
  }

  signin(signinCredentials: { email: string, password: string }) {
    return this.httpClient.post<AuthResponseData>(`${this.baseUrl}/auth/login`, {
      email: signinCredentials.email,
      password: signinCredentials.password
    }).pipe(
      catchError(this.handleError),
      tap({
        next: (resData) => {
          this.handleAuthentication(resData);
          this.log("USER LOGGED IN");
        }
      })
    );
  }

  autoSignin() {
    const raw = localStorage.getItem('wmStoreLoggedUserData');
    if (!raw) {
      this.user$.next(null);
      return;
    }

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.warn('Invalid localStorage JSON');
      localStorage.removeItem('wmStoreLoggedUserData');
      this.logout();
      return;
    }

    if (!parsed.data || !parsed.hash) {
      console.warn('Missing hash or data');
      this.logout();
      return;
    }

    if (!this.cryptoService.verifyHash(parsed.data, parsed.hash)) {
      console.warn('Data tampered — hash mismatch');
      localStorage.removeItem('wmStoreLoggedUserData');
      this.logout();
      return;
    }

    const userData = parsed.data;
    const loadedUser = new User(
      userData.id,
      userData.firstName,
      userData.lastName,
      userData.email,
      userData.role,
      userData._accessToken,
      userData._accessTokenExpirationDate,
      userData._refreshToken,
      userData._refreshTokenExpirationDate,
    );

    if (loadedUser.accessToken) {
      if (loadedUser.refreshToken) {
        if (!this.tokenService.isValidJwt(loadedUser.accessToken) ||
          !this.tokenService.isValidJwt(loadedUser.refreshToken)) {
          console.warn('Invalid token structure');
          this.logout();
          return;
        }
      }

      this.user$.next(loadedUser);
      const accessTokenExpireTime = this.tokenService.getTokenExpiration(loadedUser.accessToken);

      if (accessTokenExpireTime.getTime() <= Date.now()) {
        this.refreshToken().subscribe({ error: () => this.logout() });
      } else {
        this.setAutoLogout(accessTokenExpireTime);
        this.setTokenRefresh(accessTokenExpireTime);
      }
    } else {
      this.logout();
    }
  }



  logout() {
    this.log("LOGGING OUT USER");
    this.user$.next(null);
    this.router.navigate(['/auth'], { replaceUrl: true });
    localStorage.removeItem('wmStoreLoggedUserData');

    if (this.accessTokenExpirationTimer) {
      clearTimeout(this.accessTokenExpirationTimer);
    }
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
    }

    this.accessTokenExpirationTimer = null;
    this.refreshTokenTimer = null;
  }

  setAutoLogout(expirationDate: Date) {
    const expirationDuration = Math.max(expirationDate.getTime() - new Date().getTime(), 0);
    this.log(`Logout Scheduled In: ${expirationDuration / 1000}s`);

    if (this.accessTokenExpirationTimer) {
      clearTimeout(this.accessTokenExpirationTimer);
    }

    this.accessTokenExpirationTimer = setTimeout(() => {
      this.log("AUTOMATIC LOGOUT TRIGGERED");
      this.logout();
    }, expirationDuration);
  }

  private setTokenRefresh(accessTokenExpiration: Date) {
    const refreshTime = accessTokenExpiration.getTime() - new Date().getTime() - (10 * 1000);
    this.log(`Refresh Scheduled In: ${refreshTime / 1000}s`);
    if (this.refreshTokenTimer) {
      clearTimeout(this.refreshTokenTimer);
    }

    if (refreshTime > 0) {

      this.refreshTokenTimer = setTimeout(() => {
        this.refreshToken().subscribe({
          error: (err) => {
          }
        });
      }, refreshTime);
    }
  }

  private i = 1;

  refreshToken() {
    const user = this.user$.value;
    if (!user?.refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    if (this.refreshInProgress()) {
      return this.refreshSubject.pipe(
        filter(token => token !== null),
        take(1)
      );
    }

    this.refreshInProgress.set(true);

    this.log("REFRESHING TOKEN " + this.i++);

    // const headers = new HttpHeaders({
    //   Authorization: `Bearer ${user.accessToken}`,
    // });

    return this.httpClient.post<{ access_token: string, refresh_token: string }>(`${this.baseUrl}/auth/getnewtoken`, {
      refresh_token: user.refreshToken
    }).pipe(
      tap({
        next: (responseData) => {
          const accessTokenExpireTime = this.tokenService.getTokenExpiration(responseData.access_token);
          const refreshTokenExpireTime = this.tokenService.getTokenExpiration(responseData.refresh_token);

          const updatedUser = new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.role,
            responseData.access_token,
            accessTokenExpireTime,
            responseData.refresh_token,
            refreshTokenExpireTime,
          );
          this.log(`Access Token Expires At: ${accessTokenExpireTime}`);
          this.log(`Refresh Token Expires At: ${refreshTokenExpireTime}`);

          clearTimeout(this.accessTokenExpirationTimer);
          clearTimeout(this.refreshTokenTimer);

          this.setAutoLogout(accessTokenExpireTime);
          this.setTokenRefresh(accessTokenExpireTime);

          this.user$.next(updatedUser);

          const userPayload = { ...updatedUser };
          const hash = this.cryptoService.generateHash(userPayload);

          localStorage.setItem('wmStoreLoggedUserData', JSON.stringify({
            data: userPayload,
            hash
          }));

          this.refreshSubject.next(responseData.access_token);
        }
      }),
      map(res => res.access_token),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        this.logout();
        return throwError(() => error);
      }),
      finalize(() => {
        this.refreshInProgress.set(false);
      })
    );
  }

  setupStorageListener() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'wmStoreLoggedUserData') {
        if (event.newValue === null && this.user$.value) {
          // localStorage cleared
          this.logout();
        } else if (event.newValue) {
          try {
            const parsed = JSON.parse(event.newValue);
            if (!parsed.hash || !parsed.data || !this.cryptoService.verifyHash(parsed.data, parsed.hash)) {
              console.warn('External modification detected — logging out');
              this.logout();
            } else {
              // Optional: silently revalidate in case other tab refreshed token
              this.autoSignin();
            }
          } catch {
            console.warn('Invalid JSON in storage event');
            this.logout();
          }
        }
      }
    });
  }


  private handleAuthentication(responseData: AuthResponseData) {
    const accessTokenExpireTime = this.tokenService.getTokenExpiration(responseData.access_token);
    const refreshTokenExpireTime = this.tokenService.getTokenExpiration(responseData.refresh_token);

    const user = new User(
      responseData.user._id,
      responseData.user.first_name,
      responseData.user.last_name,
      responseData.user.email,
      responseData.user.user_role,
      responseData.access_token,
      accessTokenExpireTime,
      responseData.refresh_token,
      refreshTokenExpireTime,
    );

    this.user$.next(user);

    console.log("INITIAL LOGIN REFRESH");
    console.log(refreshTokenExpireTime);
    console.log("INITIAL LOGIN ACCESS");
    console.log(accessTokenExpireTime);

    this.setAutoLogout(accessTokenExpireTime);
    this.setTokenRefresh(accessTokenExpireTime);

    const userPayload = { ...user };
    const hash = this.cryptoService.generateHash(userPayload);

    localStorage.setItem('wmStoreLoggedUserData', JSON.stringify({
      data: userPayload,
      hash
    }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';

    console.log(errorRes);

    if (errorRes.error && errorRes.error.message) {
      errorMsg = errorRes.error.message;
    } else if (errorRes.message) {
      errorMsg = errorRes.message;
    }

    return throwError(() => new Error(errorMsg));
  }

  private log(msg: string) {
    console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
  }

}
