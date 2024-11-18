import { Routes } from '@angular/router';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((c) => c.LoginComponent),
  },
];
