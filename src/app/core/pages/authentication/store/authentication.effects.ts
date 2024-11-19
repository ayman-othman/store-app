import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from './authentication.actions';
import { catchError, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Roles } from '../pages/login/models/types/role.type';
import { ROLES } from '../pages/login/models/const/login.const';

@Injectable()
export class AuthenticationEffects {
  // Injects
  private _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private _actions$: Actions = inject(Actions);
  private _snackBar = inject(MatSnackBar);
  private _translateService = inject(TranslateService);
  private _Router: Router = inject(Router);

  // LOGIN
  login$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthenticationActions.lOGIN),
      switchMap((action) => {
        return this._authenticationService.userSignIn(action.payload).pipe(
          switchMap((response) => {
            this._snackBar.open(
              this._translateService.instant('login.success')
            );
            this._navigateBasedOnRole(
              this._authenticationService.getUserRole()!
            );

            return of(
              AuthenticationActions.lOGIN_SUCCESS({ payload: response })
            );
          }),
          catchError((error) => {
            this._snackBar.open(this._translateService.instant('login.fail'));
            return of(AuthenticationActions.lOGIN_FAIL({ error }));
          })
        );
      })
    )
  );

  // LOGOUT
  logout$ = createEffect(() =>
    this._actions$.pipe(
      ofType(AuthenticationActions.lOGOUT),
      switchMap((action) => {
        return this._authenticationService.logOut().pipe(
          switchMap((response) => {
            this._snackBar.open(
              this._translateService.instant('logout.success')
            );
            this._Router.navigateByUrl('auth/login');

            return of(AuthenticationActions.lOGOUT_SUCCESS());
          }),
          catchError((error) => {
            this._snackBar.open(this._translateService.instant('logout.fail'));
            return of(AuthenticationActions.lOGOUT_FAIL({ error }));
          })
        );
      })
    )
  );

private _navigateBasedOnRole(role: Roles) {
  switch (role) {
    case ROLES.admin:
      this._Router.navigateByUrl('/admin');
      break;
    case ROLES.user:
      this._Router.navigateByUrl('/');
      break;
    default:
      this._Router.navigateByUrl('/unauthorized');
      break;
  }
}

}
