import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './features/auth/auth.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: LayoutComponent },
    { path: 'auth', component:  AuthComponent, loadChildren: () => import('./features/auth/auth.routes').then(mod => mod.routes)},
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
