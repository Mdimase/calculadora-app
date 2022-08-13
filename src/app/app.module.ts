import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { EncabezadoComponent } from './components/encabezado/encabezado.component';
import { ActividadesStandarComponent } from './components/actividades-standar/actividades-standar.component';
import { ActividadesCustomComponent } from './components/actividades-custom/actividades-custom.component';
import { HistorialComponent } from './components/historial/historial.component';
import { EstimacionComponent } from './components/estimacion/estimacion.component';
import { InicioPageModule } from './pages/inicio/inicio.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    ActividadesStandarComponent,
    ActividadesCustomComponent,
    HistorialComponent,
    EstimacionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ComponentsModule,
    InicioPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
