import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalPage } from './principal.page';

const routes: Routes = [
  { path:'', component:PrincipalPage,
    children:[
      {path:'',redirectTo:'/principal/inicio',pathMatch:'full'},
      {
        path: 'inicio',
        loadChildren: () => import('../inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: 'historial',
        loadChildren: () => import('../historial/historial.module').then( m => m.HistorialPageModule)
      },
      {
        path: 'actividades/custom',
        loadChildren: () => import('../actividades-custom/actividades-custom.module').then( m => m.ActividadesCustomPageModule)
      },
      {
        path: 'estimacion',
        loadChildren: () => import('../estimacion/estimacion.module').then( m => m.EstimacionPageModule)
      },
      {
        path: 'actividades/standar',
        loadChildren: () => import('../actividades-standar/actividades-standar.module').then( m => m.ActividadesStandarPageModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalPageRoutingModule {}
