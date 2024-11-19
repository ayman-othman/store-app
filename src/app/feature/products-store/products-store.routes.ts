import { Routes } from '@angular/router';
import { authGuard } from '@store-app/core/guards/auth/auth.guard';

export const ProductsStoreRoutes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/products-list/products-list.component').then(
        (c) => c.ProductsListComponent
      ),
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(
        (c) => c.ProductDetailsComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/products-dashboard/products-dashboard.component').then(
        (c) => c.ProductsDashboardComponent
      ),
  },
];
