import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public menuPages = [
    { title: 'Inicio', url: '/inicio', icon: 'home' },
    { title: 'Estimacion', url: '/estimacion', icon: 'calculator' },
    { title: 'Actividades Standar', url: '/actividades/standar', icon: 'albums' },
    { title: 'Actividades Custom', url: '/actividades/custom', icon: 'heart' },
    { title: 'Historial', url: '/historial', icon: 'archive' }
  ];
  constructor(private router: Router) {}

  /*IMPORTANTE: desligarlo al authService*/
  cerrarSesion(){
    this.router.navigate(['acceso']);
  }

}
