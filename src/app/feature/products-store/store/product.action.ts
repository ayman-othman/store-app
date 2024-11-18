import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IProduct } from '../models/interfaces/product.interface';
import { IPagination } from '../models/interfaces/pagination.interface';

export enum ProductsActionEnum {
  MAIN = 'products',
  // PRODUCTS
  GET_PRODUCT_LIST = 'GET_PRODUCT_LIST',
  GET_PRODUCT_LIST_SUCCESS = 'GET_PRODUCT_LIST_SUCCESS',
  GET_PRODUCT_LIST_FAIL = 'GET_PRODUCT_LIST_FAIL',
  // PRODUCT DETAILS
  GET_PRODUCT = 'GET_PRODUCT',
  GET_PRODUCT_SUCCESS = 'GET_PRODUCT_SUCCESS',
  GET_PRODUCT_FAIL = 'GET_PRODUCT_FAIL',
  // CATEGORY LIST
  GET_CATEGORY_LIST = 'GET_CATEGORY_LIST',
  GET_CATEGORY_LIST_SUCCESS = 'GET_CATEGORY_LIST_SUCCESS',
  GET_CATEGORY_LIST_FAIL = 'GET_CATEGORY_LIST_FAIL',
  // GET PRODUCTS BY CATEGORY
  GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY',
  GET_PRODUCTS_BY_CATEGORY_SUCCESS = 'GET_PRODUCTS_BY_CATEGORY_SUCCESS',
  GET_PRODUCTS_BY_CATEGORY_FAIL = 'GET_PRODUCTS_BY_CATEGORY_FAIL',
}

export const ProductsActions = createActionGroup({
  source: ProductsActionEnum.MAIN,
  events: {
    // GET LIST
    [ProductsActionEnum.GET_PRODUCT_LIST]: props<{
      payload: IPagination;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_LIST_SUCCESS]: props<{
      payload: Array<IProduct>;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    //  PRODUCT Details
    [ProductsActionEnum.GET_PRODUCT]: props<{
      payload: string;
    }>(),
    [ProductsActionEnum.GET_PRODUCT_SUCCESS]: props<{
      payload: {
        productDetails:IProduct,
        cachedProductDetails:Map<string, IProduct>
      };
    }>(),
    [ProductsActionEnum.GET_PRODUCT_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // CATEGORY LIST
    [ProductsActionEnum.GET_CATEGORY_LIST]: emptyProps(),
    [ProductsActionEnum.GET_CATEGORY_LIST_SUCCESS]: props<{
      payload: Array<string>;
    }>(),
    [ProductsActionEnum.GET_CATEGORY_LIST_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),

    // GET PRODUCTS BY CATEGORY
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY]: props<{
      payload: string;
    }>(),
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY_SUCCESS]: props<{
      payload: Array<IProduct>;
    }>(),
    [ProductsActionEnum.GET_PRODUCTS_BY_CATEGORY_FAIL]: props<{
      error?: HttpErrorResponse;
    }>(),
  },
});
