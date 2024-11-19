import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from './authentication.actions';
import { catchError, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AuthenticationEffects {
  // Injects
  private _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private _actions$: Actions = inject(Actions);
  private _snackBar = inject(MatSnackBar);
  private _translateService = inject(TranslateService);
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
}
