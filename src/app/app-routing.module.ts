import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ActividadesCustomComponent } from './components/actividades-custom/actividades-custom.component';
import { ActividadesStandarComponent } from './components/actividades-standar/actividades-standar.component';
import { EstimacionComponent } from './components/estimacion/estimacion.component';
import { HistorialComponent } from './components/historial/historial.component';

const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },

  { path:'actividades/standar', component:ActividadesStandarComponent, pathMatch: 'full'},
  { path:'actividades/custom', component:ActividadesCustomComponent, pathMatch: 'full'},
  { path:'historial', component:HistorialComponent, pathMatch:'full'},
  { path:'estimacion', component:EstimacionComponent, pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
