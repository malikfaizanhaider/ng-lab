import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {AuthService} from 'app/core/auth/auth.service';
import {of, switchMap} from 'rxjs';

/**
 * NoAuthGuard is a function that implements the CanActivate and CanActivateChild interfaces.
 * It checks if the user is authenticated and if so, it redirects them to the root URL.
 * If the user is not authenticated, it allows the access.
 *
 * @param route
 * @param state
 */
export const NoAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  // Inject the Router
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService).check().pipe(
    switchMap((authenticated) => {
      // If the user is authenticated...
      if (authenticated) {
        // Redirect the user to the root URL
        return of(router.parseUrl(''));
      }

      // If the user is not authenticated, allow the access
      return of(true);
    }),
  );
};
