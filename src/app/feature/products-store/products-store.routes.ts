import { Routes } from '@angular/router';

export const ProductsStoreRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/products-list/products-list.component').then(
        (c) => c.ProductsListComponent
      ),
  },
];
