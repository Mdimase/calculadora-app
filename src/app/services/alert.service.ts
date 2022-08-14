import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Actividad } from '../interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController){}

  /* alerta informativa con los datos de una actividad */
  async itemDescription(actividad: Actividad){
    const alert = await this.alertController.create({
      header: actividad.nombre,
      mode:'ios',
      cssClass:'custom-alert',
      subHeader: actividad.descripcion,
      message: 'tiempo estimado: ' + actividad.tiempo.toString() + ' minutos',
      buttons: ['OK']
    });
    await alert.present();
  }

}
