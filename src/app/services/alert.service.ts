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
      subHeader: actividad.descripcion,
      message: 'tiempo estimado: ' + actividad.tiempo.toString() + ' minutos',
      mode:'ios',
      cssClass:'custom-alert',
      buttons: ['OK']
    });
    await alert.present();
  }

  /* alerta de confirmacion */
  /* retorna la eleccion del usuario */
  async confirm(actividad: Actividad, action: string){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      subHeader:'¿ Deseas ' + action.toLowerCase() + ' de forma permanente ' + actividad.nombre + ' ?',
      mode:'ios',
      cssClass:'custom-alert',
      buttons: [{ text:'Cancelar', role:'cancel' },{ text:action, role:'confirm'}]
    });
    await alert.present();
    return (await alert.onWillDismiss()).role; /* opcion elegida por el usuario */
  }

}
