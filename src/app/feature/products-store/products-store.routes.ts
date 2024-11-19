import { Routes } from '@angular/router';
import { authGuard } from '@store-app/core/guards/auth/auth.guard';
import { roleGuardGuard } from '@store-app/core/guards/role/role-guard.guard';
import { ROLES } from '@store-app/core/pages/authentication/pages/login/models/const/login.const';

export const ProductsStoreRoutes_USER: Routes = [
  {
    path: '',
    canActivate: [roleGuardGuard],
    children: [
      {
        path: '',
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
    ],
    data: { roles: [ROLES.user] },

  },
];

export const ProductsStoreRoutes_ADMIN: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [roleGuardGuard],
    loadComponent: () =>
      import('./pages/products-dashboard/products-dashboard.component').then(
        (c) => c.ProductsDashboardComponent
      ),
    data: { roles: [ROLES.admin] },
  },
];
