import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividad';
import { ActividadesService } from 'src/app/services/actividades.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimacion',
  templateUrl: './estimacion.page.html',
  styleUrls: ['./estimacion.page.scss'],
})
export class EstimacionPage implements OnInit, OnDestroy {

  actividades: Actividad[] = [];
  private suscripcion: Subscription;

  constructor(private popoverService: PopoverService, private actividadesService: ActividadesService) { }

  ngOnInit(){
   this.suscripcion = this.actividadesService.getActividades$().subscribe( actividades =>{
      this.actividades = actividades;
      console.log(this.actividades);
    });
  }

  ngOnDestroy(): void {
    console.log('estimacion destruida');
    this.suscripcion.unsubscribe();
  }

  /* popover info page*/
  async mostrarPopover(evento: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
    this.popoverService.simpleMessage(message,evento);
  }

}
