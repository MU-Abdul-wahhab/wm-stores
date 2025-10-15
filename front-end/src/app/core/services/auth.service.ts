import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal} from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { AuthResponseData, User } from './auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enteredEmail = signal<string>('');
  user$ = new BehaviorSubject<User | null>(null);
  private baseUrl = environment.apiBaseUrl;
  private accessTokenExpirationTimer: any;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  private tokenService = inject(TokenService);

  automaticallySetEnteredMailToLoginField(email: string) {
    this.enteredEmail.set(email);
  }

  signup(signupCredentials: { firstName: string, lastName: string, email: string, mobile: string, password: string }) {
    return this.httpClient.post<{ status: string, message: string }>(`${this.baseUrl} /auth/signup`, {
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
        }
      })
    );
  }

  autoSignin() {
    const userData = localStorage.getItem('wmStoreLoggedUserData');

    if (!userData) {
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
      parsedUserData. _refreshTokenExpirationDate,
    );

    if(loadedUser.accessToken){
      this.user$.next(loadedUser);
      const accessTokenExpireTime = this.tokenService.getTokenExpiration(loadedUser.accessToken);
      this.autoLogout(Math.max(accessTokenExpireTime.getTime() - new Date().getTime(), 0));
    }else{
      this.logout();
    }
  }

  logout() {
    this.user$.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('wmStoreLoggedUserData');
    if (this.accessTokenExpirationTimer) {
      clearTimeout(this.accessTokenExpirationTimer);
    }
    this.accessTokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    if (this.accessTokenExpirationTimer) {
      clearTimeout(this.accessTokenExpirationTimer);
    }

    console.log(expirationDuration)

    this.accessTokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(responseData: AuthResponseData) {
    const accessTokenExpireTime = this.tokenService.getTokenExpiration(responseData.access_token);
    const refreshTokenExpireTime = this.tokenService.getTokenExpiration(responseData.refresh_token);
    console.log(responseData.access_token)
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
    this.autoLogout(Math.max(accessTokenExpireTime.getTime() - new Date().getTime(), 0));
    localStorage.setItem('wmStoreLoggedUserData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';

    console.log(errorRes);

    if (errorRes.error && errorRes.error.message) {
      errorMsg = errorRes.error.message;
    }
    else if (errorRes.message) {
      errorMsg = errorRes.message;
    }

    return throwError(() => new Error(errorMsg));
  }

}
