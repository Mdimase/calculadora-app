import { Component, OnInit } from '@angular/core';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-actividades-custom',
  templateUrl: './actividades-custom.page.html',
  styleUrls: ['./actividades-custom.page.scss'],
})
export class ActividadesCustomPage implements OnInit {

  constructor(private popoverService: PopoverService) { }

  ngOnInit() {
  }

  /* popover info*/
  async mostrarPopover(evento){
    const message = 'actividades academicas creadas por el usuario';
    this.popoverService.simpleMessage(message,evento);
  }

  actionSheet(){
    console.log('action');
  }

}
