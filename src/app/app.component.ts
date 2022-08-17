import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  email: string;
  username: string;

  public menuPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Estimacion', url: '/estimacion', icon: 'calculator' },
    { title: 'Actividades Standar', url: '/actividades/standar', icon: 'albums' },
    { title: 'Actividades Custom', url: '/actividades/custom', icon: 'heart' },
    { title: 'Historial', url: '/historial', icon: 'archive' }
  ];

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(): void {
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  /*IMPORTANTE: desligarlo al authService*/
  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['acceso']);
  }

}
