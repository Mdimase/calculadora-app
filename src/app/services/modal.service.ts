import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from '../interfaces/activity';
import { SelectModalPage } from '../pages/select-modal/select-modal.page';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalController: ModalController){}

  async openModal(activities: Activity[], minutesObjetive: number): Promise<Activity[]>{
    this.initSelectedActivities(activities);
    const modal = await this.modalController.create({
      component: SelectModalPage,
      componentProps:{activities, minutesObjetive}
    });
    modal.present();

    return await (await modal.onWillDismiss()).data; //respuesta del modal
  }

  /* inicializa los atributos checked en false para el checkbox y cantidad en 0 */
  private initSelectedActivities(activities: Activity[]){
    activities.map((a)=>{
      a.amount = 0;
    });
  }

}
