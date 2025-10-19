import { inject } from '@angular/core';
import { CanMatchFn, RedirectCommand, Router } from '@angular/router';
import { map, take } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const canAccessAuthorizedPages: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
      }
      return new RedirectCommand(router.parseUrl('/auth/login'));
    }),
  );
};

export const canAccessLoginPage: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        const isAuth = !!user;
        if (isAuth) {
          return new RedirectCommand(router.parseUrl('/home'));
        }
      } else if (localStorage.getItem('wmStoreLoggedUserData')) {
        return new RedirectCommand(router.parseUrl('/home'));
      }
      return true;
    }),
  );
};
