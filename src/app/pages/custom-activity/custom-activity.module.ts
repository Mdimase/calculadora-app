import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomActivityPageRoutingModule } from './custom-activity-routing.module';

import { CustomActivityPage } from './custom-activity.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomActivityPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ScrollingModule
  ],
  declarations: [CustomActivityPage]
})
export class CustomActivityPageModule {}
