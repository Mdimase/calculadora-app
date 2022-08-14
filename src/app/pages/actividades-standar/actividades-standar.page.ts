import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Actividad } from 'src/app/interfaces/actividad';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-actividades-standar',
  templateUrl: './actividades-standar.page.html',
  styleUrls: ['./actividades-standar.page.scss'],
})
export class ActividadesStandarPage implements OnInit {

  busqueda = '';

  actividades: Actividad[] = [
    {nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
  ];

  constructor(private popoverService: PopoverService, private alertService: AlertService) { }

  ngOnInit() {
  }

  /* popover info page*/
  async mostrarPopover(evento: any){
    const message = 'actividades academicas comumente utilizadas en plataformas de aprendizaje virtual';
    this.popoverService.simpleMessage(message,evento);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(actividad: Actividad) {
    this.alertService.itemDescription(actividad);
  }

  /*buscar en la lista -> search bar*/
  buscar(event){
    this.busqueda = event.detail.value;
  }
}
