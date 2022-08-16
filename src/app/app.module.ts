import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioPageModule } from './pages/inicio/inicio.module';
import { ComponentsModule } from './components/components.module';
import { HistorialPageModule } from './pages/historial/historial.module';
import { ActividadesCustomPageModule } from './pages/actividades-custom/actividades-custom.module';
import { EstimacionPageModule } from './pages/estimacion/estimacion.module';
import { ActividadesStandarPageModule } from './pages/actividades-standar/actividades-standar.module';
import { PipesModule } from './pipes/pipes.module';
import { PopoverService } from './services/popover.service';
import { AlertService } from './services/alert.service';
import { ActividadesService } from './services/actividades.service';
import { AgregarActividadModalPageModule } from './pages/agregar-actividad-modal/agregar-actividad-modal.module';
import { ModalService } from './services/modal.service';
import { EditarActividadModalPageModule } from './pages/editar-actividad-modal/editar-actividad-modal.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    InicioPageModule,
    HistorialPageModule,
    ActividadesCustomPageModule,
    EstimacionPageModule,
    ActividadesStandarPageModule,
    PipesModule,
    AgregarActividadModalPageModule,
    EditarActividadModalPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PopoverService,
    AlertService,
    ActividadesService,
    ModalService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
