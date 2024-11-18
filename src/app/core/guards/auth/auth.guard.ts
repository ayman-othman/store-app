import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '@store-app/core/services/authentication/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  if (authenticationService.isUserAuthorized()) {
    return true;
  } else {
    router.navigateByUrl('auth/login');
    return false;
  }
};
