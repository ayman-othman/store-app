import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ILoginRequest } from '../pages/login/models/interfaces/login.interface';

export enum AuthenticationActionEnum {
  MAIN = 'authentication',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAIL = 'LOGIN_FAIL',

  LOGOUT = 'LOGOUT',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'LOGOUT_FAIL',
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

    [AuthenticationActionEnum.LOGOUT]: emptyProps(),
    [AuthenticationActionEnum.LOGOUT_SUCCESS]: emptyProps(),
    [AuthenticationActionEnum.LOGOUT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),
  },
});
