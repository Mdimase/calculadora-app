import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-editar-actividad-modal',
  templateUrl: './editar-actividad-modal.page.html',
  styleUrls: ['./editar-actividad-modal.page.scss'],
})
export class EditarActividadModalPage implements OnInit {

  @Input() actividadActual: Actividad;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  /* cancela el modal y vuelve a la pagina anterior */
  regresar(){
    this.modalController.dismiss();
  }

  /* retorna la actividad al modal service */
  editarActividad(actividad: Actividad){
    this.modalController.dismiss(actividad);
  }

}
