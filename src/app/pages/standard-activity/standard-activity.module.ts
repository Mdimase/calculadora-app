import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandardActivityPageRoutingModule } from './standard-activity-routing.module';

import { StandardActivityPage } from './standard-activity-page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandardActivityPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ScrollingModule
  ],
  declarations: [StandardActivityPage]
})
export class StandardActivityPageModule {}
