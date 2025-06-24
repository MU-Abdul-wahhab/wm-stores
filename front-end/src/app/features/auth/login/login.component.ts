import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router, CanDeactivateFn } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
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

    const enteredPassword = this.form.value.password;
    const enteredEmail = this.form.value.email;

    console.log(enteredPassword);
    console.log(enteredEmail);

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