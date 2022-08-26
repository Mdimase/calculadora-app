import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandarActivityPageRoutingModule } from './standar-activity-routing.module';

import { StandarActivityPage } from './standar-activity.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandarActivityPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ScrollingModule
  ],
  declarations: [StandarActivityPage]
})
export class StandarActivityPageModule {}
