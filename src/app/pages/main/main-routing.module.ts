import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  { path:'', component:MainPage,
    children:[
      {path:'',redirectTo:'/main/home',pathMatch:'full'},
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../estimation-history/estimation-history.module').then( m => m.EstimationHistoryPageModule)
      },
      {
        path: 'custom/activity',
        loadChildren: () => import('../custom-activity/custom-activity.module').then( m => m.CustomActivityPageModule)
      },
      {
        path: 'estimation',
        loadChildren: () => import('../estimation/estimation.module').then( m => m.EstimationPageModule)
      },
      {
        path: 'standard/activity',
        loadChildren: () => import('../standard-activity/standard-activity.module').then( m => m.StandardActivityPageModule)
      },
      {
        path: 'change/password',
        loadChildren: () => import('../change-password/change-password.module').then( m => m.ChangePasswordPageModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
