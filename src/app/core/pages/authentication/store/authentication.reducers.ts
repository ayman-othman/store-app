import { createReducer, on } from '@ngrx/store';
import { INITIAL_AUTHENTICATION_STATE } from './authentication.state';
import { AuthenticationActions } from './authentication.actions';

export const AuthenticationReducer = createReducer(
  INITIAL_AUTHENTICATION_STATE,
  // <---- LOGIN ---->
  on(AuthenticationActions.lOGIN, (state) => {
    return {
      ...state,
      user: null,
      isUserAuthorized: false,
      error: null,
    };
  }),

  // <---- LOGIN SUCCUSS---->
  on(AuthenticationActions.lOGIN_SUCCESS, (state, { payload }) => {
    
    return {
      ...state,
      user: payload,
      isUserAuthorized: true,
      error: null,
    };
  }),

  // <---- LOGIN FAILED---->
  on(AuthenticationActions.lOGIN_FAIL, (state, { error }) => {
    return {
      ...state,
      user: null,
      isUserAuthorized: false,
      error: error,
    };
  })
);
