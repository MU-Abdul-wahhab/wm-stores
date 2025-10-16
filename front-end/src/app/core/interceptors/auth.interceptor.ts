import {HttpErrorResponse, HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, exhaustMap, switchMap, take, throwError} from 'rxjs';

import {AuthService} from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return authService.user$.pipe(
    take(1),
    exhaustMap((user) => {
      if (!user) {
        return next(req);
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${user.accessToken}`,
      });

      const modifiedReq = req.clone({headers});
      return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && user) {
            return authService.refreshToken().pipe(
              switchMap(newToken => {
                const newReq = req.clone({
                  setHeaders: { Authorization: `Bearer ${newToken}` }
                });
                return next(newReq);
              }),
              catchError(() => {
                authService.logout();
                return throwError(() => error);
              })
            );
          }
          return throwError(() => error);
        }),
      );
    }),
  );
};
