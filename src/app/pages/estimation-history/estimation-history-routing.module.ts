import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstimationHistoryPage } from './estimation-history.page';

const routes: Routes = [
  {
    path: '',
    component: EstimationHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstimationHistoryPageRoutingModule {}
