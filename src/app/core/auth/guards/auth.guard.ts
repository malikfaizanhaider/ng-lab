import {inject} from '@angular/core';
import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {AuthService} from 'app/core/auth/auth.service';
import {of, switchMap} from 'rxjs';

/**
 * AuthGuard is a function that can be used as a CanActivate or CanActivateChild guard in Angular routing.
 * It checks the authentication status of the user and redirects to the sign-in page if the user is not authenticated.
 * If the user is authenticated, it allows the access.
 *
 * @param route
 * @param state
 * @returns Observable<boolean | UrlTree>
 */
export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  // Inject the Router service
  const router: Router = inject(Router);

  // Check the authentication status
  return inject(AuthService).check().pipe(
    switchMap((authenticated) => {
      // If the user is not authenticated...
      if (!authenticated) {
        // Redirect to the sign-in page with a redirectUrl param
        const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
        const urlTree = router.parseUrl(`sign-in?${redirectURL}`);

        return of(urlTree);
      }

      // If the user is authenticated, allow the access
      return of(true);
    }),
  );
};
