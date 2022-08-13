import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimacionPageRoutingModule } from './estimacion-routing.module';

import { EstimacionPage } from './estimacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstimacionPage]
})
export class EstimacionPageModule {}
