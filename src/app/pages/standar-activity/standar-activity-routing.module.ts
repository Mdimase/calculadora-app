import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandarActivityPage } from './standar-activity.page';

const routes: Routes = [
  {
    path: '',
    component: StandarActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandarActivityPageRoutingModule {}
