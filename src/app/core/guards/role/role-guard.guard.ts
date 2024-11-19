import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ROLES } from '@store-app/core/pages/authentication/pages/login/models/const/login.const';
import { AuthenticationService } from '@store-app/core/services/authentication/authentication.service';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const userRole = authenticationService.getUserRole();
  const allowedRoles = route.data['roles'] as Array<string>;

  if (userRole &&allowedRoles.includes(userRole)) {
    return true;
  }
  if (userRole === ROLES.admin) {
    router.navigateByUrl('/admin');
  } else {
    router.navigateByUrl('/auth/unauthorized');
  }
  return false;
};
