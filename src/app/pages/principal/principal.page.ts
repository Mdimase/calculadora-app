import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

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

  ngOnInit(){
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['acceso']);
  }

}
