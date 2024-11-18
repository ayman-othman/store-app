import { createReducer, on } from '@ngrx/store';
import { INITIAL_PRODUCTS_STATE } from './product.state';
import { ProductsActions } from './product.action';

export const ProductsReducer = createReducer(
  INITIAL_PRODUCTS_STATE,
  // <---- PRODUCTS LIST ---->

  on(ProductsActions.gET_PRODUCT_LIST_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: payload,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      list: [],
      error: error,
    };
  }),
  // <---- PRODUCT DETAILS ---->
  on(ProductsActions.gET_PRODUCT, (state) => {
    return {
      ...state,
      productDetails: null,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      productDetails: null,
      error: error,
    };
  }),
  // <---- CATEGORIES LIST ---->
  on(ProductsActions.gET_CATEGORY_LIST, (state) => {
    return {
      ...state,
      categories: [],
      error: null,
    };
  }),
  on(ProductsActions.gET_CATEGORY_LIST_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      categories: payload,
      error: null,
    };
  }),
  on(ProductsActions.gET_CATEGORY_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      categories: [],
      error: error,
    };
  })
);
