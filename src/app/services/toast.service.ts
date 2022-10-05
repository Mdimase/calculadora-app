import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController){}

  async showMessage(message: string){
    const toast = await this.toastController.create({
      icon:'checkmark-done',
      message,
      duration: 1500,
      position:'bottom',
      animated:true,
      mode:'ios',
      cssClass:'message-toast'
    });
    toast.present();
  }

  async showErrorMessage(message: string){
    const toast = await this.toastController.create({
      icon:'alert-done',
      message,
      duration: 1500,
      position:'top',
      animated:true,
      mode:'ios',
      cssClass:'toast-message-error'
    });
    toast.present();
  }

  async showWelcomeMessage(message: string){
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position:'top',
      animated:true,
      mode:'ios',
      cssClass:'welcome-toast'
    });
    toast.present();
  }
}
