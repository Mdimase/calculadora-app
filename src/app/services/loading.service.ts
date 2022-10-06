import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController){}

  async showLoading() {
    const loading = await this.loadingController.create({
      spinner: 'circles',
      mode:'md',
      cssClass:'loading-spinner'
    });
    loading.present();
  }

}
