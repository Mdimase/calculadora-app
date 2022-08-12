import { Component } from '@angular/core';
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
  constructor() {}
}
