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
      buttons: [{text:'OK', cssClass:'alert-button-OK'}]
    });
    await alert.present();
  }

  /* alerta de confirmacion */
  /* retorna la eleccion del usuario */
  async confirm(message: string, buttonText: string, cssClass: string, dialog: string = ''): Promise<string>{
    const alert = await this.alertController.create({
      header: 'Confirmar',
      subHeader:message,
      message:dialog,
      mode:'ios',
      cssClass:'custom-alert',
      buttons: [{ text:'Cancelar', role:'cancel',cssClass:'alert-button-cancel' },{ text:buttonText, role:'confirm',cssClass}]
    });
    await alert.present();
    return (await alert.onWillDismiss()).role; /* opcion elegida por el usuario */
  }

  /* genera una alert con un form validado adentro solicitando
  nombre(required,maxlength(255), tiempo(required,>0) y descripcion(maxlength(255)))
  finalmente retorna los valores ingresados en una promesa de activity o null si presiona cancelar */
  async addForm(): Promise<Activity>{
    let res: Activity = null;
    await this.initAlertForm('Agregar Actividad').then((r)=>{
      if(r.role !== 'Cancel'){
        res = r.data;
      }
    });
    return res;
  }

  /* genera una alert con un form validado adentro solicitando
  nombre(required,maxlength(255), tiempo(required,>0) y descripcion(maxlength(255)))
  finalmente retorna los valores ingresados en una promesa de activity o null si presiona cancelar */
  async editForm(currentActivity: Activity) {
    let res: Activity = null;
    await this.initAlertForm('Editar Actividad',currentActivity.name,currentActivity.time.toString(),currentActivity.description)
      .then((r)=> {
        if(r.role !== 'Cancel'){
          res = r.data;
          res.id = currentActivity.id;
          res.time = Number(r.data.time);
        }
      });
      return res;
  }

  /* back button hardware close alert input previous redirection*/
  async hideAlert(){
    try {
      const element = await this.alertController.getTop();
      if (element) {
          element.dismiss();
          return;
      }
  } catch (error) {
    throw new error('can\'t hide alert');
  }
  }

  async showAlert(title: string ,message: string){
    const alert = await this.alertController.create({
      header:title,
      subHeader:message,
      mode:'ios',
      cssClass:'custom-alert',
      buttons: [{text:'OK', cssClass:'alert-button-OK',}],
    });
    await alert.present();
    setTimeout(()=>alert.dismiss(), 8000);
  }

  /* inserta los mensajes de error en el dom debajo del correspondiente input */
  private showError(alert, position: number, message: string) {
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
  private hideError() {
    const element = document.getElementById('validation-errors');
    if (element) {
      element.remove();
    }
  }

  private async initAlertForm(header: string, name: string = '', time: string = '', description: string = '') {
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
           cssClass:'alert-button-cancel',
           handler:(formData => null)
        },
        {
          text: 'Enviar',
          cssClass:'alert-button-send',
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
    return await alert.onWillDismiss();
  }

}
