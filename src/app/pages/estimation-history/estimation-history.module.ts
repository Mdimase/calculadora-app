import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstimationHistoryPageRoutingModule } from './estimation-history-routing.module';

import { EstimationHistoryPage } from './estimation-history.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimationHistoryPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [EstimationHistoryPage],
  providers:[File,FileOpener]
})
export class EstimationHistoryPageModule {}
