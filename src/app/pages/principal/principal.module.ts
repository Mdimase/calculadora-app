import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { InicioPageModule } from '../inicio/inicio.module';
import { HistorialPageModule } from '../historial/historial.module';
import { ActividadesCustomPageModule } from '../actividades-custom/actividades-custom.module';
import { EstimacionPageModule } from '../estimacion/estimacion.module';
import { ActividadesStandarPageModule } from '../actividades-standar/actividades-standar.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { AgregarActividadModalPageModule } from '../agregar-actividad-modal/agregar-actividad-modal.module';
import { EditarActividadModalPageModule } from '../editar-actividad-modal/editar-actividad-modal.module';
import { RouteReuseStrategy } from '@angular/router';
import { PopoverService } from 'src/app/services/popover.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ModalService } from 'src/app/services/modal.service';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    InicioPageModule,
    HistorialPageModule,
    ActividadesCustomPageModule,
    EstimacionPageModule,
    ActividadesStandarPageModule,
    PipesModule,
    AgregarActividadModalPageModule,
    EditarActividadModalPageModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PopoverService,
    AlertService,
    ActividadesService,
    ModalService,
    AuthService
  ],
})
export class PrincipalPageModule {}
