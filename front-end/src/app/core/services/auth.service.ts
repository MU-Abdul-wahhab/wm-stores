import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 enteredEmail = signal<string>('');

  automaticallySetEnteredMailToLoginField(email: string) {
    this.enteredEmail.set(email);
  }

}
