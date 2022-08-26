import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController){}

  /* alerta informativa con los datos de una actividad */
  async itemDescription(activity: Activity){
    const alert = await this.alertController.create({
      header: activity.name,
      subHeader: activity.description,
      message: 'tiempo estimado: ' + activity.time.toString() + ' minutos',
      mode:'ios',
      cssClass:'custom-alert',
      buttons: ['OK']
    });
    await alert.present();
  }

  /* alerta de confirmacion */
  /* retorna la eleccion del usuario */
  async confirm(activity: Activity, action: string){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      subHeader:'¿ Deseas ' + action.toLowerCase() + ' de forma permanente ' + activity.name + ' ?',
      mode:'ios',
      cssClass:'custom-alert',
      buttons: [{ text:'Cancelar', role:'cancel' },{ text:action, role:'confirm'}]
    });
    await alert.present();
    return (await alert.onWillDismiss()).role; /* opcion elegida por el usuario */
  }

}
