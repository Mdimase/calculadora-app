import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesCustomPage } from './actividades-custom.page';

const routes: Routes = [
  {
    path: '',
    component: ActividadesCustomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActividadesCustomPageRoutingModule {}
