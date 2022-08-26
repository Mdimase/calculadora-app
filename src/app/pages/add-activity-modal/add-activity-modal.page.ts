import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-add-activity-modal',
  templateUrl: './add-activity-modal.page.html',
  styleUrls: ['./add-activity-modal.page.scss'],
})
export class AddActivityModalPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  /* cancela el modal y vuelve a la pagina anterior */
  back(){
    this.modalController.dismiss();
  }

  /* retorna el la actividad al modal service */
  addActivity(activity: Activity){
    this.modalController.dismiss(activity);
  }

}
