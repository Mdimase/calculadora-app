import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from '../interfaces/activity';
import { AddActivityModalPage } from '../pages/add-activity-modal/add-activity-modal.page';
import { EditActivityModalPage } from '../pages/edit-activity-modal/edit-activity-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController){}

  /* modal con formulario para agregar una nueva actividad */
  /* retorna la actividad creada por el usuario */
  async addActivity(){
    const modal = await this.modalController.create({
      component: AddActivityModalPage,
    });
    await modal.present();
    return (await modal.onWillDismiss())?.data;
  }

  /* modal con formulario para editar una actividad */
  /* retorna la actividad editada por el usuario */
  async editActivity(currentActivity: Activity){
    const modal = await this.modalController.create({
      component: EditActivityModalPage,
      componentProps: { currentActivity }
    });
    await modal.present();
    return (await modal.onWillDismiss()).data;
  }

}
