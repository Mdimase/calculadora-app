import { Component, OnInit } from '@angular/core';
import { Actividad } from 'src/app/interfaces/actividad';
import { ActividadesService } from 'src/app/services/actividades.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-actividades-custom',
  templateUrl: './actividades-custom.page.html',
  styleUrls: ['./actividades-custom.page.scss'],
})
export class ActividadesCustomPage implements OnInit {

  busqueda = '';
  actividades: Actividad[] = [];

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private actividadesService: ActividadesService){}

  ngOnInit(){
    this.actividadesService.getActividades$().subscribe(actividades =>{
      this.actividades = actividades;
    });
  }

  /* popover info*/
  async mostrarPopover(evento){
    const message = 'actividades academicas creadas por el usuario';
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

  async mostrarEditOptions(event, actividad: Actividad){
    this.popoverService.editOptions(event, actividad);
  }

  mostrarAgregarModal(){
    console.log('modal add act');
  }

}
