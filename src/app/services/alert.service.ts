import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Activity } from '../interfaces/activity';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController, private activitiesService: ActivitiesService){}

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
  async confirm(activity: Activity, action: string): Promise<string>{
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

  /* inserta los mensajes de error en el dom debajo del correspondiente input */
  showError(alert, position: number, message: string) {
    if (!alert.getElementsByClassName('validation-errors').length) {
      const input = alert.getElementsByTagName('input')[position];

      const validationErrors = document.createElement('div');
      validationErrors.className = 'validation-errors';
      validationErrors.id = 'validation-errors';

      const errorMessage = document.createElement('small');
      errorMessage.classList.add('error-message');
      errorMessage.textContent = message;

      validationErrors.appendChild(errorMessage);

      input.insertAdjacentElement('afterend', validationErrors);
    }
  }

  /* quita del dom el error correspondiente */
  hideError() {
    const element = document.getElementById('validation-errors');
    if (element) {
      element.remove();
    }
  }

  async initAlertForm(header: string, name: string = '', time: string = '', description: string = ''): Promise<Activity>{
    const alert = await this.alertController.create({
      header,
      subHeader:'crea tu propia actividad',
      backdropDismiss: false,
      mode: 'ios',
      cssClass: '',
      inputs: [
        {
          type: 'text',
          name: 'name',
          label: 'Nombre',
          placeholder: 'Nombre',
          value:name,
          attributes: {
            maxlength: 255,
          }
        },
        {
          type: 'number',
          name: 'time',
          label: 'Tiempo',
          placeholder: 'Tiempo',
          value:time,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Descripcion',
          placeholder: 'Descripcion',
          value:description,
          attributes: {
            maxlength: 255,
          }
        },
      ],
      buttons: [
        {
           text: 'Cancelar',
           role: 'Cancel',
           handler:(formData => formData)
        },
        {
          text: 'Enviar',
          handler: (formData: { name: string; time: string; description: string }) => {
            if(!formData.name) {
              this.showError(alert, 0,'Campo obligatorio');
              return false;
            }
            else {
              this.hideError();
            }
            if(!formData.time){
              this.showError(alert, 1,'Campo obligatorio');
              return false;
            }
            else{
              this.hideError();
            }
            if(Number(formData.time) < 0){
              this.showError(alert,1,'valor minimo 0');
              return false;
            }
            else{
              this.hideError();
            }
            return formData;
          },
        },
      ],
    });

    await alert.present();
    return (await alert.onWillDismiss())?.data;
  }

  /* genera una alert con un form validado adentro solicitando
  nombre(required,maxlength(255), tiempo(required,>0) y descripcion(maxlength(255)))
  finalmente retorna los valores ingresados en una promesa de activity */
  async addForm(): Promise<Activity> {
    return await this.initAlertForm('Agregar Actividad');
  }

  /* genera una alert con un form validado adentro solicitando
  nombre(required,maxlength(255), tiempo(required,>0) y descripcion(maxlength(255)))
  finalmente retorna los valores ingresados en una promesa de activity */
  async editForm(currentActivity: Activity): Promise<Activity>{
    const res=await this.initAlertForm('Editar Actividad',currentActivity.name,currentActivity.time.toString(),currentActivity.description);
    res.id = currentActivity.id;
    res.time = Number(res.time);
    return res;
  }

}
