import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { HomePageModule } from '../home/home.module';
import { EstimationHistoryPageModule } from '../estimation-history/estimation-history.module';
import { CustomActivityPageModule } from '../custom-activity/custom-activity.module';
import { EstimationPageModule } from '../estimation/estimation.module';
import { StandarActivityPageModule } from '../standar-activity/standar-activity.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule,
    ComponentsModule,
    HomePageModule,
    EstimationHistoryPageModule,
    CustomActivityPageModule,
    EstimationPageModule,
    StandarActivityPageModule,
    PipesModule,
    MainPageRoutingModule,
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
