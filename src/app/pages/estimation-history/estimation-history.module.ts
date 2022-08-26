import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationHistoryPageRoutingModule } from './estimation-history-routing.module';

import { EstimationHistoryPage } from './estimation-history.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimationHistoryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [EstimationHistoryPage]
})
export class EstimationHistoryPageModule {}
