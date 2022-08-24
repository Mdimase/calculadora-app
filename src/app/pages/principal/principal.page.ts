import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit{

  email: string;
  username: string;

  public menuPages = [
    { title: 'Inicio', url: '/principal/inicio', icon: 'home' },
    { title: 'Estimacion', url: '/principal/estimacion', icon: 'calculator' },
    { title: 'Actividades Standar', url: '/principal/actividades/standar', icon: 'albums' },
    { title: 'Actividades Custom', url: '/principal/actividades/custom', icon: 'heart' },
    { title: 'Historial', url: '/principal/historial', icon: 'archive' }
  ];

  constructor(private router: Router, private authService: AuthService){
  }

  ionViewWillEnter(){
    console.log('ion principal view');
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  ngOnInit(){
    console.log('principal init');
    this.email = this.authService.getEmail();
    this.username = this.authService.getUsername();
  }

  cerrarSesion(){
    this.authService.cerrarSesion();
    this.router.navigate(['acceso']);
  }

}
