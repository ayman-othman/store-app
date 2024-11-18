import { createSelector } from '@ngrx/store';
import { IAppState } from '../../../store/app.store';

export const ProductsListSelector = createSelector(
  (state: IAppState) => state?.products,
  (products) => products?.list
);



export const CategoriesSelector = createSelector(
  (state: IAppState) => state?.products,
  (products) => products?.categories
);
