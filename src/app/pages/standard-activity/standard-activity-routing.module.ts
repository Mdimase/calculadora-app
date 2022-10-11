import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandardActivityPage } from './standard-activity-page';

const routes: Routes = [
  {
    path: '',
    component: StandardActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandardActivityPageRoutingModule {}
