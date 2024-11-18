import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../models/interfaces/product.interface';
import { IPagination } from '../models/interfaces/pagination.interface';

export enum ProductsActionEnum {
  MAIN = 'products',
  // PRODUCTS
  GET_LIST = 'GET_LIST',
  GET_LIST_SUCCESS = 'GET_LIST_SUCCESS',
  GET_LIST_FAIL = 'GET_LIST_FAIL',
  // PRODUCT DETAILS
  GET_PRODUCT = 'GET_PRODUCT',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL',
  // CATEGORY
  GET_CATEGORY_LIST = 'GET_CATEGORY_LIST',
  GET_CATEGORY_LIST_SUCCESS = 'GET_CATEGORY_LIST_SUCCESS',
  GET_CATEGORY_LIST_FAIL = 'GET_CATEGORY_LIST_FAIL',
}

export const ProductsActions = createActionGroup({
  source: ProductsActionEnum.MAIN,
  events: {
    // GET LIST
    [ProductsActionEnum.GET_LIST]: props<{
      payload: IPagination;
    }>(),
    [ProductsActionEnum.GET_LIST_SUCCESS]: props<{
      payload: Array<IProduct>;
    }>(),
    [ProductsActionEnum.GET_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    //  PRODUCT Details
    [ProductsActionEnum.GET_PRODUCT]: props<{
      payload: number;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_SUCCESS]: props<{
      payload: IProduct;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // CATEGORY
    [ProductsActionEnum.GET_CATEGORY_LIST]: emptyProps(),
    [ProductsActionEnum.GET_CATEGORY_LIST_SUCCESS]: props<{
      payload: Array<string>;
    }>(),
    [ProductsActionEnum.GET_CATEGORY_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),
  },
});
