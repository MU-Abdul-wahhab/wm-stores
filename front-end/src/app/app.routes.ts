import {Routes} from '@angular/router';
import {AuthComponent} from './features/auth/auth.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {LayoutComponent} from './layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./features/auth/auth.routes').then(mod => mod.routes),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./layout/layout.routes').then(mod => mod.routes)
  },
  {path: '**', component: NotFoundComponent, title: 'Evara - Not Found'}
];
