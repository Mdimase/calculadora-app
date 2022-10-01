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
  suscriptionBackButton: Subscription;

  public menuPages = [
    { title: 'Inicio', url: '/main/home', icon: 'home' },
    { title: 'Estimacion', url: '/main/estimation', icon: 'calculator' },
    { title: 'Actividades Estandar', url: '/main/standar/activity', icon: 'albums' },
    { title: 'Actividades Personalizadas', url: '/main/custom/activity', icon: 'heart' },
    { title: 'Historial', url: '/main/history', icon: 'archive' }
  ];

  constructor(private router: Router,
              private platform: Platform,
              private navigationService: NavigationService,
              private authService: AuthService){}

  ionViewWillEnter(){
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
    this.suscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,async ()=>{
      console.log(this.platform.backButton.observers.length);
      this.navigationService.back();
    });
  }

  ngOnDestroy(): void {
    this.suscriptionBackButton.unsubscribe();
  }

  logout(){
    this.authService.logout();
    this.navigationService.clear();
    this.router.navigate(['login']);
  }

  changePassword(){
    this.router.navigate(['/main/change/password']);
  }

}
