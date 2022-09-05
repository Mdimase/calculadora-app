import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationPageRoutingModule } from './estimation-routing.module';

import { EstimationPage } from './estimation.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EstimationPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [EstimationPage]
})
export class EstimationPageModule {}
