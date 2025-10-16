import {Component, DestroyRef, inject, signal} from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import {RouterLink, Router, CanDeactivateFn} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {AlertComponent} from "../../../shared/alert/alert.component";

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink, AlertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private router = inject(Router);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  submitted = signal(false);
  isLoading = signal(false);
  showPassword = signal(false);
  errorMsg = signal<string | undefined>(undefined);
  successMsg = signal<string | undefined>(undefined);

  form = new FormGroup({
    name: new FormGroup({
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
    }),
    mobile: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^07[01245678][0-9]{7}$/)]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)]
    }),
    agreement: new FormControl(false, {
      validators: [Validators.requiredTrue]
    }),
  });

  get isNamesInvalid() {
    return (this.form.controls.name.touched && this.form.controls.name.dirty && this.form.controls.name.invalid);
  }

  get isMobileInvalid() {
    return (this.form.controls.mobile.touched && this.form.controls.mobile.dirty && this.form.controls.mobile.invalid);
  }

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

    const enteredFirstName = this.form.value.name?.firstName;
    const enteredLastName = this.form.value.name?.lastName;
    const enteredMobileNumber = this.form.value.mobile;
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    if (enteredFirstName && enteredLastName && enteredMobileNumber && enteredEmail && enteredPassword) {

      const subscription = this.authService.signup({
        email: enteredEmail,
        firstName: enteredFirstName,
        lastName: enteredLastName,
        mobile: enteredMobileNumber,
        password: enteredPassword
      }).subscribe({
        next: (resData) => {
          if (resData.status === 'success') {
            this.errorMsg.set(undefined);
            this.successMsg.set(resData.message);
            this.authService.automaticallySetEnteredMailToLoginField(enteredEmail ? enteredEmail : '');
            this.form.reset();
            this.submitted.set(true);
          }
          this.isLoading.set(false);
        },
        error: (err: Error) => {
          this.successMsg.set(undefined);
          this.errorMsg.set(err.message);
          this.form.patchValue({
            email: ''
          });
          this.isLoading.set(false);
        }
      });

      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }

  }

  onSuccessDialogClose() {
    this.successMsg.set(undefined);
    this.router.navigate(['/auth', 'login'], {replaceUrl: true});
  }

}

export const canLeaveSignupPage: CanDeactivateFn<SignupComponent> = (component) => {
  if (component.submitted()) {
    return true;
  }

  const isCredentialEntered = component.form.value.name?.firstName || component.form.value.name?.lastName ||
    component.form.value.mobile || component.form.value.email || component.form.value.password

  if (isCredentialEntered) {
    return window.confirm('Do you really want to leave? You will lose the entered credentials.')
  }

  return true;
};
