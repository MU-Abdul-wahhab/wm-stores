import { Routes } from '@angular/router';
import { canLeaveLoginPage, LoginComponent } from './login/login.component';
import { canLeaveSignupPage, SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canDeactivate: [canLeaveLoginPage] },
            { path: 'signup', component: SignupComponent, canDeactivate: [canLeaveSignupPage] },
            { path: '**', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];
