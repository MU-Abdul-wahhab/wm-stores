import {Routes} from '@angular/router';
import {canLeaveLoginPage, LoginComponent} from './login/login.component';
import {canLeaveSignupPage, SignupComponent} from './signup/signup.component';
import {canAccessLoginPage} from '../../core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {
        path: 'login',
        component: LoginComponent,
        canMatch: [canAccessLoginPage],
        canDeactivate: [canLeaveLoginPage],
        title: 'Evara - Login'
      },
      {
        path: 'signup', component: SignupComponent, canDeactivate: [canLeaveSignupPage], title: 'Evara - Sign' +
          ' Up'
      },
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]
  }
];
