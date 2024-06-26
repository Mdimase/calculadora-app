import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from '../interfaces/activity';
import { ActivitiesEstimationModalPage } from '../pages/activities-estimation-modal/activities-estimation-modal.page';
import { SelectModalPage } from '../pages/select-modal/select-modal.page';
import { SelectionActivityModalPage } from '../pages/selection-activity-modal/selection-activity-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController){}

  /* modal pirmario de estimacion donde se indican los cuantificadores de las actividades seleccionadas */
  async openSelectModalPage(activities: Activity[], minutesObjetive: number): Promise<Activity[]>{
    this.initSelectedActivities(activities);
    const modal = await this.modalController.create({
      component: SelectModalPage,
      componentProps:{activities, minutesObjetive},
      cssClass:'fullscreen'
    });
    modal.present();

    return (await modal.onWillDismiss()).data; //respuesta del modal
  }

  async openSelectionActivityModalPage(activities: Activity[]): Promise<Activity>{
    const modal = await this.modalController.create({
      component: SelectionActivityModalPage,
      componentProps: {activities},
      cssClass:'fullscreen'
    });
    modal.present();
    return (await modal.onWillDismiss()).data;
  }

  /* listado de actividades seleccionadas en una estimacion, mostrado en el historial */
  async showActivities(activities: Activity[]){
    const modal = await this.modalController.create({
      component: ActivitiesEstimationModalPage,
      componentProps:{activities},
      cssClass:'fullscreen'
    });
    modal.present();
  }

  /* inicializa los atributos checked en false para el checkbox y cantidad en 0 */
  private initSelectedActivities(activities: Activity[]){
    activities.map((a)=>{
      a.amount = 0;
    });
  }

}
