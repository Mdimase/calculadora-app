import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesCustomPageRoutingModule } from './actividades-custom-routing.module';

import { ActividadesCustomPage } from './actividades-custom.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesCustomPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ScrollingModule
  ],
  declarations: [ActividadesCustomPage]
})
export class ActividadesCustomPageModule {}
