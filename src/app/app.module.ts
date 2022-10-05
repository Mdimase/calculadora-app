import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PopoverService } from './services/popover.service';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/auth.service';
import { ActivitiesService } from './services/activities.service';
import { LoginPageModule } from './pages/login/login.module';
import { RegistrationPageModule } from './pages/registration/registration.module';
import { ResetPasswordPageModule } from './pages/reset-password/reset-password.module';
import { MainPageModule } from './pages/main/main.module';
import { ToastService } from './services/toast.service';
import { NavigationService } from './services/navigation.service';
import { EstimationService } from './services/estimation.service';
import { ModalService } from './services/modal.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

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
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    PopoverService,
    AlertService,
    AuthService,
    ActivitiesService,
    ToastService,
    NavigationService,
    EstimationService,
    ModalService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
