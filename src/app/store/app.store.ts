import { ActionReducerMap } from '@ngrx/store';
import * as authenticationStore from '../core/pages/authentication/store';
import * as productStore from '../feature/products-store/store';

export interface IAppState {
  [x: string]: any;
  authentication: authenticationStore.IAuthenticationState;
  products: productStore.IProductsState;
}

export const INITIAL_APP_STATE: IAppState = {
  authentication: authenticationStore.INITIAL_AUTHENTICATION_STATE,
  products: productStore.INITIAL_PRODUCTS_STATE,
};

export const APP_REDUCERS: ActionReducerMap<IAppState> = {
  authentication: authenticationStore.AuthenticationReducer,
  products: productStore.ProductsReducer,
};

export const APP_EFFECTS = [
  authenticationStore.AuthenticationEffects,
  productStore.ProductsEffects,
];
