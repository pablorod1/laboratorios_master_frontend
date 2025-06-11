import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/pages/home/home.component').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/pages/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/pages/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'gallery',
    loadComponent: () =>
      import('./components/pages/gallery/gallery.component').then(
        (m) => m.GalleryComponent
      ),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/pages/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
  },
  {
    path: 'crud',
    loadComponent: () =>
      import('./components/pages/crud/crud.component').then(
        (m) => m.CrudComponent
      ),
  },
];
