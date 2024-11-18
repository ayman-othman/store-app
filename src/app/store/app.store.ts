import { ActionReducerMap } from '@ngrx/store';
import * as authenticationStore from '../core/pages/authentication/store';

export interface IAppState {
  [x: string]: any;
  authentication: authenticationStore.IAuthenticationState;
}

export const INITIAL_APP_STATE: IAppState = {
  authentication: authenticationStore.INITIAL_AUTHENTICATION_STATE,
};

export const APP_REDUCERS: ActionReducerMap<IAppState> = {
  authentication: authenticationStore.AuthenticationReducer,
};

export const APP_EFFECTS = [authenticationStore.AuthenticationEffects];
