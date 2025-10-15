import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {inject, Injectable, OnInit, signal} from '@angular/core';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {AuthResponseData, User} from './auth.model';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enteredEmail = signal<string>('');
  user$ = new BehaviorSubject<User | null>(null);
  private baseUrl = environment.apiBaseUrl;
  private accessTokenExpirationTimer: any;
  private refreshTokenTimer: any;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

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
    const userData = localStorage.getItem('wmStoreLoggedUserData');

    if (!userData) {
      this.user$.next(null);
      return;
    }

    const parsedUserData: {
      id: string,
      firstName: string,
      lastName: string,
      email: string,
      role: string,
      _accessToken: string,
      _accessTokenExpirationDate: Date,
      _refreshToken: string,
      _refreshTokenExpirationDate: Date,
    } = JSON.parse(userData);

    const loadedUser = new User(
      parsedUserData.id,
      parsedUserData.firstName,
      parsedUserData.lastName,
      parsedUserData.email,
      parsedUserData.role,
      parsedUserData._accessToken,
      parsedUserData._accessTokenExpirationDate,
      parsedUserData._refreshToken,
      parsedUserData._refreshTokenExpirationDate,
    );

    if (loadedUser.accessToken) {
      this.log("AUTO LOGGING IN");
      this.user$.next(loadedUser);
      const accessTokenExpireTime = this.tokenService.getTokenExpiration(loadedUser.accessToken);
      if (accessTokenExpireTime.getTime() <= Date.now()) {
        this.refreshToken().subscribe({
          error: () => this.logout()
        });
        return;
      }

      this.setAutoLogout(accessTokenExpireTime);
      this.setTokenRefresh(accessTokenExpireTime);

    } else {
      if (loadedUser.refreshToken) {
        this.refreshToken().subscribe({
          error: () => this.logout()
        });
      } else {
        this.logout();
      }
    }
  }

  logout() {
    this.log("LOGGING OUT USER");
    this.user$.next(null);
    this.router.navigate(['/auth'], {replaceUrl: true});
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
          error: () => {
            this.logout();
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

    this.log("REFRESHING TOKEN " + this.i++);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${user.accessToken}`,
    });

    return this.httpClient.post<{ access_token: string, refresh_token: string }>(`${this.baseUrl}/auth/getnewtoken`, {
      refresh_token: user.refreshToken
    }, {
      headers
    }).pipe(
      tap({
        next: (responseData) => {
          const accessTokenExpireTime = this.tokenService.getTokenExpiration(responseData.access_token);
          const refreshTokenExpireTime = this.tokenService.getTokenExpiration(user.refreshToken!);

          const updatedUser = new User(
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.role,
            responseData.access_token,
            accessTokenExpireTime,
            user.refreshToken!,
            refreshTokenExpireTime,
          );
          this.log(`Access Token Expires At: ${accessTokenExpireTime}`);
          this.log(`Refresh Token Expires At: ${refreshTokenExpireTime}`);

          clearTimeout(this.accessTokenExpirationTimer);
          clearTimeout(this.refreshTokenTimer);

          this.setAutoLogout(accessTokenExpireTime);
          this.setTokenRefresh(accessTokenExpireTime);

          this.user$.next(updatedUser);
          localStorage.setItem('wmStoreLoggedUserData', JSON.stringify(updatedUser));
        }
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error)
        this.logout();
        return throwError(() => error);
      })
    );
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

    this.setAutoLogout(accessTokenExpireTime);
    this.setTokenRefresh(accessTokenExpireTime);

    localStorage.setItem('wmStoreLoggedUserData', JSON.stringify(user));
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
