import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  email: string;
  username: string;

  public menuPages = [
    { title: 'Inicio', url: '/main/home', icon: 'home' },
    { title: 'Estimacion', url: '/main/estimation', icon: 'calculator' },
    { title: 'Actividades Estandar', url: '/main/standar/activity', icon: 'albums' },
    { title: 'Actividades Personalizadas', url: '/main/custom/activity', icon: 'heart' },
    { title: 'Historial', url: '/main/history', icon: 'archive' }
  ];

  constructor(private router: Router, private authService: AuthService){}

  ionViewWillEnter(){
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  ngOnInit(){
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
