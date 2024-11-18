import { IProduct } from '../models/interfaces/product.interface';

export interface IProductsState {
  list: Array<IProduct>;
  productDetails: IProduct | null;
  cachedProductDetails: Map<number, IProduct>;
  categories: Array<string>;
  error: any;
}

export const INITIAL_PRODUCTS_STATE: IProductsState = {
  list: [],
  productDetails: null,
  cachedProductDetails: new Map(),
  categories: [],
  error: null,
};
