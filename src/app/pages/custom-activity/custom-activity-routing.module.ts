import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomActivityPage } from './custom-activity.page';

const routes: Routes = [
  {
    path: '',
    component: CustomActivityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomActivityPageRoutingModule {}
