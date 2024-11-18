import { createActionGroup, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ILoginRequest } from '../pages/login/models/interfaces/login.interface';

export enum AuthenticationActionEnum {
  MAIN = 'authentication',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',
}

export const AuthenticationActions = createActionGroup({
  source: AuthenticationActionEnum.MAIN,
  events: {
    [AuthenticationActionEnum.LOGIN]: props<{ payload: ILoginRequest }>(),
    [AuthenticationActionEnum.LOGIN_SUCCESS]: props<{
      payload: unknown;
    }>(),
    [AuthenticationActionEnum.LOGIN_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),
  },
});
