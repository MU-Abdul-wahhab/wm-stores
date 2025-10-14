import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { User } from './auth.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enteredEmail = signal<string>('');
  user = new BehaviorSubject<User | null>(null);
  private baseUrl = environment.apiBaseUrl;
  private httpClient = inject(HttpClient);
  private tokenService = inject(TokenService);

  automaticallySetEnteredMailToLoginField(email: string) {
    this.enteredEmail.set(email);
  }

  signup(signupCredentials: { firstName: string, lastName: string, email: string, mobile: string, password: string }) {
    return this.httpClient.post<{ status: string, message: string }>(this.baseUrl + '/auth/signup', {
      first_name: signupCredentials.firstName,
      last_name: signupCredentials.lastName,
      email: signupCredentials.email,
      phone: signupCredentials.mobile,
      password: signupCredentials.password
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'An unknown error occurred!';

    if (errorRes.error && errorRes.error.message) {
      errorMsg = errorRes.error.message;
    }
    else if (errorRes.message) {
      errorMsg = errorRes.message;
    }

    return throwError(() => new Error(errorMsg));
  }

}
