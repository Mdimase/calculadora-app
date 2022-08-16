import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-agregar-actividad-modal',
  templateUrl: './agregar-actividad-modal.page.html',
  styleUrls: ['./agregar-actividad-modal.page.scss'],
})
export class AgregarActividadModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit(){
  }

  /* cancela el modal y vuelve a la pagina anterior */
  regresar(){
    this.modalController.dismiss();
  }

  /* retorna el la actividad al modal service */
  agregarActividad(actividad: Actividad){
    this.modalController.dismiss(actividad);
  }

}
