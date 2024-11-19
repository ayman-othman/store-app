import { createReducer, on } from '@ngrx/store';
import { INITIAL_PRODUCTS_STATE } from './product.state';
import { ProductsActions } from './product.action';
import { IProduct } from '../models/interfaces/product.interface';

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

  // <---- PRODUCTS LIST BY CATEGORY ---->
  on(ProductsActions.gET_PRODUCTS_BY_CATEGORY, (state) => {
    return {
      ...state,
      list: null,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCTS_BY_CATEGORY_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: payload,
      error: null,
    };
  }),
  on(ProductsActions.gET_PRODUCT_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      list: null,
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
  on(ProductsActions.gET_PRODUCT_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      productDetails: payload.productDetails,
      cachedProductDetails: new Map(payload.cachedProductDetails),
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
  on(ProductsActions.gET_CATEGORY_LIST_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      categories: ['all', ...payload],
      error: null,
    };
  }),
  on(ProductsActions.gET_CATEGORY_LIST_FAIL, (state, { error }) => {
    return {
      ...state,
      categories: [],
      error: error,
    };
  }),

  // <---- ADD PRODUCT ---->
  on(ProductsActions.aDD_PRODUCT_SUCCESS, (state, { payload }) => {
    return {
      ...state,
      list: [payload as IProduct, ...(state.list || [])],
      error: null,
    };
  }),
  on(ProductsActions.aDD_PRODUCT_FAIL, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  })
);
