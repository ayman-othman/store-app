export const PRODUCTS_QUERY_PARAM = {
  pageNumber: 'pageNumber',
  category: 'category',
  search: 'search',
} as const;
export type ProductsQueryParam = (typeof PRODUCTS_QUERY_PARAM)[keyof typeof PRODUCTS_QUERY_PARAM];
