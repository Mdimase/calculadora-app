import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Activity} from '../interfaces/activity';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController){}

  /* alerta informativa con los datos de una actividad */
  async itemDescription(header: string, subHeader: string, message: string){
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
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
        res = {
          id:0,
          name: r.data.name,
          description: r.data.description,
          timeMinutes: Number(r.data.time),
          custom: true
        };
      }
    });
    return res;
  }

  /* genera una alert con un form validado adentro solicitando
  nombre(required,maxlength(255), tiempo(required,>0) y descripcion(maxlength(255)))
  finalmente retorna los valores ingresados en una promesa de activity o null si presiona cancelar */
  async editForm(currentActivity: Activity) {
    let newActivity: Activity = null;
    await this.initAlertForm('Editar Actividad',currentActivity.name,currentActivity.timeMinutes.toString(),currentActivity.description)
      .then((r)=> {
        if(r.role !== 'Cancel'){
          newActivity = {
            id:currentActivity.id,
            name: r.data.name,
            description: r.data.description,
            timeMinutes: Number(r.data.time),
            custom:true
          };
        }
      });
      return newActivity;
  }

  // cerrar la alerta actual
  async hideAlert(): Promise<boolean>{
    const element = await this.alertController.getTop();
    if (element) {
      element.dismiss();
        return true;
    }
    else{
      return false;
    }
  }

  // alerta basica con posible autodismiss tras 8s
  async showAlert(title: string ,message: string, autoDismiss: boolean){
    const alert = await this.alertController.create({
      header:title,
      subHeader:message,
      mode:'ios',
      cssClass:'custom-alert',
      buttons: [{text:'OK', cssClass:'alert-button-OK',}],
    });
    await alert.present();
    if(autoDismiss){
      setTimeout(()=>alert.dismiss(), 8000);
    }
  }

  // alerta de error
  async showErrorAlert(title: string ,message: string, autoDismiss: boolean){
    const alert = await this.alertController.create({
      header:title + ' !',
      subHeader:message,
      mode:'ios',
      cssClass:'error-alert',
      buttons: [{text:'OK', cssClass:'alert-button-OK',}],
    });
    await alert.present();
    if(autoDismiss){
      setTimeout(()=>alert.dismiss(), 8000);
    }
  }

  /* inserta los mensajes de error en el dom debajo del correspondiente input */
  // utilizado en las validaciones  del input alert
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
  // utilizado en las validaciones  del input alert
  private hideError() {
    const element = document.getElementById('validation-errors');
    if (element) {
      element.remove();
    }
  }

  // formulario de add / edit activity utilizado dentro de un alert
  private async initAlertForm(header: string, name: string = '', time: string = '', description: string = '') {
    const alert = await this.alertController.create({
      header,
      subHeader:'Crea tu propia actividad',
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
          placeholder: 'Tiempo (min)',
          value:time,
        },
        {
          type: 'textarea',
          name: 'description',
          label: 'Descripción',
          placeholder: 'Descripción',
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
          role: 'Confirm',
          cssClass:'alert-button-send',
          handler: (formData: { name: string; time: number; description: string }) => {
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
            if(formData.time < 0){
              this.showError(alert,1,'valor mínimo 0');
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
