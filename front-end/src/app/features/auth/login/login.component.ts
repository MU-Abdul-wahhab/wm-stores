import {Component, DestroyRef, inject, signal} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {RouterLink, Router, CanDeactivateFn} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

import {AlertComponent} from '../../../shared/alert/alert.component';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  isLoading = signal(false);
  submitted = signal(false);
  showPassword = signal(false);
  errorMsg = signal<string | undefined>(undefined);
  successMsg = signal<string | undefined>(undefined);

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

  onTogglePasswordVisibility() {
    this.showPassword.update(showed=> !showed);
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set(undefined);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    if (enteredEmail && enteredPassword) {

      const subscription = this.authService.signin({email: enteredEmail, password: enteredPassword}).subscribe({
        next: (resData) => {
          this.isLoading.set(false);
          this.form.reset();
          this.onSuccessDialogClose();
        },
        error: (err) => {
          this.successMsg.set(undefined);
          this.errorMsg.set(err.message);
          this.isLoading.set(false);
        }
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());

      this.submitted.set(true);
    }
  }

  onSuccessDialogClose() {
    this.successMsg.set(undefined);
    this.router.navigate(['/home'], {replaceUrl: true});
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
