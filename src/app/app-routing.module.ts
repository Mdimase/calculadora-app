import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'acceso', pathMatch: 'full' },

  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

  {
    path: 'historial',
    loadChildren: () => import('./pages/historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'actividades/custom',
    loadChildren: () => import('./pages/actividades-custom/actividades-custom.module').then( m => m.ActividadesCustomPageModule)
  },
  {
    path: 'estimacion',
    loadChildren: () => import('./pages/estimacion/estimacion.module').then( m => m.EstimacionPageModule)
  },
  {
    path: 'actividades/standar',
    loadChildren: () => import('./pages/actividades-standar/actividades-standar.module').then( m => m.ActividadesStandarPageModule)
  },
  {
    path: 'acceso',
    loadChildren: () => import('./pages/acceso/acceso.module').then( m => m.AccesoPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {path:'**', redirectTo:'acceso', pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
