import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actividad } from '../interfaces/actividad';
import { AgregarActividadModalPage } from '../pages/agregar-actividad-modal/agregar-actividad-modal.page';
import { EditarActividadModalPage } from '../pages/editar-actividad-modal/editar-actividad-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController){}

  /* modal con formulario para agregar una nueva actividad */
  /* retorna la actividad creada por el usuario */
  async agregarActividad(){
    const modal = await this.modalController.create({
      component: AgregarActividadModalPage,
    });
    await modal.present();
    return (await modal.onWillDismiss())?.data;
  }

  /* modal con formulario para editar una actividad */
  /* retorna la actividad editada por el usuario */
  async editarActividad(actividadActual: Actividad){
    const modal = await this.modalController.create({
      component: EditarActividadModalPage,
      componentProps: { actividadActual }
    });
    await modal.present();
    return (await modal.onWillDismiss()).data;
  }

}
