import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverHelpIconComponent } from '../components/popover-help-icon/popover-help-icon.component';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private popoverController: PopoverController){}

  /* mensaje simple unicamente de texto */
  async simpleMessage(message: string, evento: any){
    const popover = await this.popoverController.create({
      component:PopoverHelpIconComponent,
      componentProps:{message},
      animated:true,
      event:evento,
      mode:'ios'
    });
    await popover.present();

    /* para popovers que devuelven data*/
    const {data} = await popover.onWillDismiss();
    //console.log(data);
  }

}
