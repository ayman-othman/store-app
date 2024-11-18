export interface IAuthenticationState {
  user: unknown | null;
  isUserAuthorized: boolean;
  error: any;
}

export const INITIAL_AUTHENTICATION_STATE: IAuthenticationState = {
  user: null,
  isUserAuthorized: false,
  error: null,
};
