import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividad';
import { ActividadesService } from 'src/app/services/actividades.service';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-actividades-custom',
  templateUrl: './actividades-custom.page.html',
  styleUrls: ['./actividades-custom.page.scss'],
})
export class ActividadesCustomPage implements OnInit, OnDestroy {

  busqueda = '';
  actividades: Actividad[] = [];
  private suscripcion: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private actividadesService: ActividadesService,
              private modalService: ModalService){}

  ngOnInit(){
    this.suscripcion = this.actividadesService.getActividadesCustom$().subscribe(actividades =>{
      this.actividades = actividades;
    });
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
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

  /* primero renderiza el popover de acciones sobre una actividad */
  /* luego, dependiendo de lo que el usuario selecciona, realiza dicha accion */
  async mostrarEditOptions(event, actividad: Actividad){
    const { data } = await this.popoverService.editOptions(event, actividad);
    if(data === 'Eliminar'){
      if( await this.alertService.confirm(actividad, 'Eliminar') === 'confirm'){
        this.actividadesService.borrarActividad(actividad);
      }
    }
    if(data === 'Editar'){
      const actividadEditada: Actividad = await this.modalService.editarActividad(actividad);
      if(actividadEditada){
        this.actividadesService.editarActividad(actividad.id, actividadEditada);
      }
    }
  }

  /* primero renderiza el modal de agregar actividad*/
  /* luego, si el usuario agrego una actividad, la persiste */
  async mostrarAgregarModal(){
    const actividad: Actividad = await this.modalService.agregarActividad();
    if(actividad){
      this.actividadesService.agregarActividad(actividad);
    }
  }

}
