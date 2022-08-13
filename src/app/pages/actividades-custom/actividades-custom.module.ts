import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActividadesCustomPageRoutingModule } from './actividades-custom-routing.module';

import { ActividadesCustomPage } from './actividades-custom.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActividadesCustomPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ActividadesCustomPage]
})
export class ActividadesCustomPageModule {}
