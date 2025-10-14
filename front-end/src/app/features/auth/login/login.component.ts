import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AuthResponseData } from '../../../core/services/auth.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private authService = inject(AuthService);
  private baseUrl = environment.apiBaseUrl;
  submitted = signal(false);

  form = new FormGroup({
    email: new FormControl(this.authService.enteredEmail(), {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
  });

  get isEmailInvalid() {
    return (this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid);
  }
  get isPasswordInvalid() {
    return (this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid);
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredPassword);
    console.log(enteredEmail);

    this.httpClient.post<AuthResponseData>(this.baseUrl + '/login', {
      email: enteredEmail,
      password: enteredPassword
    });

    this.form.reset();

    this.submitted.set(true);

    this.router.navigate(['/home'], {
      replaceUrl: true
    });

  }

}

export const canLeaveLoginPage: CanDeactivateFn<LoginComponent> = (component) => {
  if (component.submitted()) {
    return true;
  }
  if (component.form.value.password || component.form.value.email) {
    return window.confirm('Do you really want to leave? You will lose the entered credentials.')
  }

  return true;
};