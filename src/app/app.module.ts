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
import { AuthService } from './services/auth.service';
import { ActivitiesService } from './services/activities.service';
import { LoginPageModule } from './pages/login/login.module';
import { RegistrationPageModule } from './pages/registration/registration.module';
import { ResetPasswordPageModule } from './pages/reset-password/reset-password.module';
import { MainPageModule } from './pages/main/main.module';

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
    LoginPageModule,
    RegistrationPageModule,
    ResetPasswordPageModule,
    MainPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PopoverService,
    AlertService,
    ModalService,
    AuthService,
    ActivitiesService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
