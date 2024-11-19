export const CRUD_ACTIONS = {
  create: 'create',
  update: 'update',
  delete: 'delete',
} as const;

export const PRODUCT_FIELD = {
  title: 'title',
  price: 'price',
  description: 'description',
  category: 'category',
  image: 'image',
  rating: 'rating',
  count: 'count',
} as const;

export type CrudActions = (typeof CRUD_ACTIONS)[keyof typeof CRUD_ACTIONS];
