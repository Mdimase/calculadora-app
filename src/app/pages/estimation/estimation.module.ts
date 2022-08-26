import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationPageRoutingModule } from './estimation-routing.module';

import { EstimationPage } from './estimation.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimationPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstimationPage]
})
export class EstimationPageModule {}
