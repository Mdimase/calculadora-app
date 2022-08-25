import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividad';
import { ActividadesService } from 'src/app/services/actividades.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-actividades-standar',
  templateUrl: './actividades-standar.page.html',
  styleUrls: ['./actividades-standar.page.scss'],
})
export class ActividadesStandarPage implements OnDestroy {

  busqueda = '';
  actividades: Actividad[];
  private suscripcion: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private actividadesService: ActividadesService
              ) { }

  ionViewWillEnter(){
    this.suscripcion = this.actividadesService.getActividadesStandar$().subscribe(actividades =>{
      this.actividades = actividades;
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
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
