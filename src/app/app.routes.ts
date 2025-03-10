import { Routes } from '@angular/router';

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
        loadComponent: () =>
          import(
            './features/blog/pages/create-page/create-page.component'
          ).then((x) => x.CreatePageComponent),
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
    ],
  },
];
