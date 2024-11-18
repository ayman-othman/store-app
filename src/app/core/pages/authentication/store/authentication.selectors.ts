import { createSelector } from '@ngrx/store';
import { IAppState } from '../../../../store/app.store';

export const AuthenticationUserSelector = createSelector(
  (state: IAppState) => state?.authentication,
  (authentication) => authentication?.user
);

export const IsUserAuthorizedSelector = createSelector(
  (state: IAppState) => state?.authentication,
  (authentication) => authentication?.isUserAuthorized
);
