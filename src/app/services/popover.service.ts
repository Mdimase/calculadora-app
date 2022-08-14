import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverEditOptionsComponent } from '../components/popover-edit-options/popover-edit-options.component';
import { PopoverHelpIconComponent } from '../components/popover-help-icon/popover-help-icon.component';
import { Actividad } from '../interfaces/actividad';
import { ActividadesService } from './actividades.service';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  constructor(private popoverController: PopoverController, private actividadesService: ActividadesService){}

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
  }

  async editOptions(evento: any, actividad: Actividad){
    const popover = await this.popoverController.create({
      component:PopoverEditOptionsComponent,
      animated:true,
      event:evento,
      mode:'ios',
      side:'bottom'
    });
    await popover.present();
    /* opcion elegida por el usuario*/
    const { data } = await popover.onWillDismiss();
    if(data === 'Eliminar'){
      this.actividadesService.borrarActividad(actividad);
    }
    if(data === 'Editar'){
      // editar
      console.log(actividad);
      //this.actividadesService.editarActividad(actividad.nombre);
    }
  }

}
