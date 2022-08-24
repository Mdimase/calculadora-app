import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PopoverService } from './services/popover.service';
import { AlertService } from './services/alert.service';
import { ModalService } from './services/modal.service';
import { AccesoPageModule } from './pages/acceso/acceso.module';
import { RegistroPageModule } from './pages/registro/registro.module';
import { AuthService } from './services/auth.service';
import { RestablecerPageModule } from './pages/restablecer/restablecer.module';
import { PrincipalPageModule } from './pages/principal/principal.module';

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
    AccesoPageModule,
    RegistroPageModule,
    RestablecerPageModule,
    PrincipalPageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PopoverService,
    AlertService,
    ModalService,
    AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
