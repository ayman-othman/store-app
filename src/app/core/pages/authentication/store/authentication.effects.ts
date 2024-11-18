import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from './authentication.actions';
import { catchError, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Injectable()
export class AuthenticationEffects {
  // Injects
  private _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private _actions$: Actions = inject(Actions);

  // LOGIN
  login$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(AuthenticationActions.lOGIN),
        switchMap((action) => {
          return this._authenticationService.userSignIn(action.payload).pipe(
            switchMap((response) =>
              of(AuthenticationActions.lOGIN_SUCCESS({ payload: response }))
            ),
            catchError((error) =>
              of(AuthenticationActions.lOGIN_FAIL({ error }))
            )
          );
        })
      )
  );
}
