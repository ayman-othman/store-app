import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./feature/products-store/products-store.routes').then(
        (r) => r.ProductsStoreRoutes_USER
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./feature/products-store/products-store.routes').then(
        (r) => r.ProductsStoreRoutes_ADMIN
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/pages/authentication/authentication.routes').then(
        (r) => r.AuthenticationRoutes
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        (r) => r.NotFoundComponent
      ),
  },
];
