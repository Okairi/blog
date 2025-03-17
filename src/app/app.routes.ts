import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (x) => x.MainLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home-page/home-page.component').then(
            (x) => x.HomePageComponent
          ),
      },
      {
        path: 'create-page',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import(
            './features/blog/pages/create-page/create-page.component'
          ).then((x) => x.CreatePageComponent),
      },
      {
        path: 'blog/:id',
        loadComponent: () =>
          import(
            './features/blog/pages/blog-detail/blog-detail.component'
          ).then((x) => x.BlogDetailComponent),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/auth-layout/auth-layout.component').then(
        (x) => x.AuthLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./features/auth/pages/login/login.component').then(
            (x) => x.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/pages/register/register.component').then(
            (x) => x.RegisterComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  // Ruta global para capturar todo lo que no coincida
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
