import { Component, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnDestroy {

  email: string;
  username: string;
  subscriptionBackButton: Subscription;

  // opciones del menu lateral
  public menuPages = [
    { title: 'Inicio', url: '/main/home', icon: 'home' },
    { title: 'Estimación', url: '/main/estimation', icon: 'calculator' },
    { title: 'Actividades Estándar', url: '/main/standard/activity', icon: 'albums' },
    { title: 'Actividades Personalizadas', url: '/main/custom/activity', icon: 'heart' },
    { title: 'Historial', url: '/main/history', icon: 'archive' }
  ];

  constructor(
    private router: Router,
    private platform: Platform,
    private navigationService: NavigationService,
    private authService: AuthService
  ){}

  ionViewWillEnter(){
    // email y username del usuario logueado para mostrar en el menu lateral
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
    // hardware back button android
    this.subscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,async ()=>{
      this.navigationService.back();
    });
  }

  ngOnDestroy(): void {
    this.subscriptionBackButton.unsubscribe();
  }

  logout(){
    this.authService.logout();
    this.navigationService.clear();
    this.router.navigateByUrl('login');
  }

  changePassword(){
    this.router.navigateByUrl('/main/change/password');
  }

}
