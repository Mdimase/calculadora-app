import { Component, OnInit } from '@angular/core';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimacion',
  templateUrl: './estimacion.page.html',
  styleUrls: ['./estimacion.page.scss'],
})
export class EstimacionPage implements OnInit {

  constructor(private popoverService: PopoverService) { }

  ngOnInit() {
  }

  /* popover info page*/
  async mostrarPopover(evento: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
    this.popoverService.simpleMessage(message,evento);
  }

}
