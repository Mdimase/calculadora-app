import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesStandarPage } from './actividades-standar.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesStandarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesStandarPageRoutingModule {}
