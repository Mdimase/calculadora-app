import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverHelpIconComponent } from 'src/app/components/popover-help-icon/popover-help-icon.component';

@Component({
  selector: 'app-actividades-custom',
  templateUrl: './actividades-custom.page.html',
  styleUrls: ['./actividades-custom.page.scss'],
})
export class ActividadesCustomPage implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {
  }

  /* popover info*/
  async mostrarPopover(evento){
    const message = 'actividades academicas creadas por el usuario';
    const popover = await this.popoverController.create({
      component:PopoverHelpIconComponent,
      componentProps:{message},
      animated:true,
      event:evento,
      mode:'ios'
    });
    await popover.present();
  }

}
