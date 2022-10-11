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
    { title: 'Actividades Estándar', url: '/main/standard/activity', icon: 'albums',
    description: 'Consulta información sobre actividades académicas comúnmente utilizadas en plataformas de aprendizaje virtual'},
    { title: 'Actividades Personalizadas', url: '/main/custom/activity', icon: 'heart',
    description: 'Crea, edita o elimina tus propias actividades académicas virtuales'},
    { title: 'Estimación', url: '/main/estimation', icon: 'calculator',
    description: 'Estima la duración de las actividades académicas virtuales que componen tú plan'},
    { title: 'Historial', url: '/main/history', icon: 'archive',
    description: 'Consulta el historial de estimaciones realizadas'}
  ];

  constructor(private router: Router,
              private platform: Platform,
              private popoverService: PopoverService,
              private navigationService: NavigationService){}

  /* popover info*/
  async showPopover(event: any){
    const message = 'Principales servicios de la aplicación';
    this.popoverService.simpleMessage(message,event);
  }

  redirect(url: string){
    this.router.navigateByUrl(url);
  }

}
