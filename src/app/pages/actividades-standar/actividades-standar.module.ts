import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesStandarPageRoutingModule } from './actividades-standar-routing.module';

import { ActividadesStandarPage } from './actividades-standar.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesStandarPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ActividadesStandarPage]
})
export class ActividadesStandarPageModule {}
