import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-edit-activity-modal',
  templateUrl: './edit-activity-modal.page.html',
  styleUrls: ['./edit-activity-modal.page.scss'],
})
export class EditActivityModalPage implements OnInit {

  @Input() currentActivity: Activity;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  /* cancela el modal y vuelve a la pagina anterior */
  back(){
    this.modalController.dismiss();
  }

  /* retorna la actividad al modal service */
  editActivity(activity: Activity){
    this.modalController.dismiss(activity);
  }

}
