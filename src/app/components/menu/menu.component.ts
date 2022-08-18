import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  email: string;
  username: string;

  public menuPages = [
    { title: 'Inicio', url: '/principal/inicio', icon: 'home' },
    { title: 'Estimacion', url: '/principal/estimacion', icon: 'calculator' },
    { title: 'Actividades Standar', url: '/principal/actividades/standar', icon: 'albums' },
    { title: 'Actividades Custom', url: '/principal/actividades/custom', icon: 'heart' },
    { title: 'Historial', url: '/principal/historial', icon: 'archive' }
  ];

  constructor(private router: Router, private authService: AuthService){}

  ngOnInit(){
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['acceso']);
  }

}
