import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () =>
          import('./core/pages/authentication/authentication.routes').then(
            (r) => r.AuthenticationRoutes
          ),
      },
];
