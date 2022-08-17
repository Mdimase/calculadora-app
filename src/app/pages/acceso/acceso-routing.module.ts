import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AccesoPage } from './acceso.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class AccesoPageRoutingModule {}
