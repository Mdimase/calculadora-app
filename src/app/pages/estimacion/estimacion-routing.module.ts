import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimacionPage } from './estimacion.page';

const routes: Routes = [
  {
    path: '',
    component: EstimacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimacionPageRoutingModule {}
