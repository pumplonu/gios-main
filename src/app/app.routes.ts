import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro-usuario',
    loadComponent: () => import('./pages/registro-usuario/registro-usuario.page').then( m => m.RegistroUsuarioPage)
  },
  {
    path: 'registro-insumo',
    loadComponent: () => import('./pages/registro-insumo/registro-insumo.page').then( m => m.RegistroInsumoPage)
  },
  {
    path: 'registro-exitoso',
    loadComponent: () => import('./pages/registro-exitoso/registro-exitoso.page').then( m => m.RegistroExitosoPage)
  },
  {
    path: 'stock',
    loadComponent: () => import('./pages/stock/stock.page').then( m => m.StockPage)
  },
  {
    path: 'alertas',
    loadComponent: () => import('./pages/alertas/alertas.page').then( m => m.AlertasPage)
  },
];
