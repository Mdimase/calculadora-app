import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage{

  items = [
    { title: 'Actividades Estandar', url: '/main/standar/activity', icon: 'albums',
    description: 'Consulta informacion sobre actividades academicas comumente utilizadas en plataformas de aprendizaje virtual'},
    { title: 'Actividades Personalizadas', url: '/main/custom/activity', icon: 'heart',
    description: 'Crea, edita o elimina tus propias actividades academicas virtuales'},
    { title: 'Estimacion', url: '/main/estimation', icon: 'calculator',
    description: 'Estima la duracion de las actividades academicas virtuales que componen su plan'},
    { title: 'Historial', url: '/main/history', icon: 'archive',
    description: 'Consulta el historial de estimaciones realizadas'}
  ];

  constructor(private router: Router,
              private platform: Platform,
              private popoverService: PopoverService,
              private navigationService: NavigationService){}

  /* popover info*/
  async showPopover(event: any){
    const message = 'Principales servicios de la aplicacion';
    this.popoverService.simpleMessage(message,event);
  }

  redirect(url: string){
    this.router.navigateByUrl(url);
  }

}
