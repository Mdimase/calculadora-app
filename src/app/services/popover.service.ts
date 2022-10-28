import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverEditOptionsComponent } from '../components/popover-edit-options/popover-edit-options.component';
import { PopoverHelpIconComponent } from '../components/popover-help-icon/popover-help-icon.component';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private popoverController: PopoverController){}

  /* mensaje simple unicamente de texto */
  async simpleMessage(message: string, event: any){
    const popover = await this.popoverController.create({
      component:PopoverHelpIconComponent,
      componentProps:{message},
      animated:true,
      event,
      mode:'ios'
    });
    await popover.present();
  }

  /* muestra las opciones de edicion de una actividad */
  /* retorna la eleccion del usuario */
  async editOptions(event: any, activity: Activity){
    const popover = await this.popoverController.create({
      component:PopoverEditOptionsComponent,
      animated:true,
      event,
      mode:'ios',
      side:'bottom'
    });
    await popover.present();
    return await popover.onWillDismiss(); /* opcion elegida por el usuario*/
  }

}
