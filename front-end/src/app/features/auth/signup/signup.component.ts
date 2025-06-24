import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  private router = inject(Router);

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
      validators: [Validators.required, Validators.minLength(10)]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
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

  onSubmit() {

    console.log(this.form);

    if (this.form.invalid) {
      return;
    }

    const enteredFirstName = this.form.value.name?.firstName;
    const enteredLastName = this.form.value.name?.lastName;
    const enteredMobileNumber = this.form.value.mobile;
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredMobileNumber);
    console.log(enteredEmail);
    console.log(enteredPassword);

    this.form.reset();

    this.router.navigate(['../../home']);

  }

}
