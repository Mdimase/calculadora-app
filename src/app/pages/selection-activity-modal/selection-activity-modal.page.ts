import { Component, Input, OnInit } from '@angular/core';
import { IonCheckbox, ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-selection-activity-modal',
  templateUrl: './selection-activity-modal.page.html',
  styleUrls: ['./selection-activity-modal.page.scss'],
})
export class SelectionActivityModalPage{

  @Input() activities: Activity[];
  searchValue = '';
  alphabeticalMap = [];
  lastCheckBox: IonCheckbox;
  selectedActivity: Activity = null;

  constructor(private popoverService: PopoverService, private modalCtrl: ModalController, private activitiesService: ActivitiesService,
              private alertService: AlertService, private platform: Platform){
    this.platform.backButton.subscribeWithPriority(10000,async ()=>{
      await this.back();
    });
  }

  ionViewWillEnter(){
    // ordenar alfabeticamente por nombre
    this.activitiesService.sortAlphabetically(this.activities);
    this.initAlphabeticalMap();
  }

   /* popover info page*/
   async showPopover(event: any){
    const message = 'Selecciona una actividad para incorporarla a tu plan academico';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `tiempo estimado: ${activity.time} minuto/s`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  back(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  send(){
    return this.modalCtrl.dismiss(this.selectedActivity, 'confirm');
  }

  /* desactiva otro checbox seleccionado anteriormente y almacena la actividad seleccionada */
  check(checkBox: IonCheckbox, activity: Activity){
    if(this.lastCheckBox && this.lastCheckBox !== checkBox){
      this.lastCheckBox.checked = false;
    }
    this.lastCheckBox = checkBox;
    if(this.lastCheckBox.checked){
      this.selectedActivity = activity;
    }
    else{
      this.selectedActivity = null;
    }
  }

  // map de letra del alfabeto + un arreglo con todas las actividades que comienzan con esa letra
  // [{letterA, [{activity1, activity2, etc}]}, {letterB, [{activity1, activity2, etc}]} ]

  private initAlphabeticalMap(): void{
    let last: string = null;
    this.activities.forEach((a)=>{
      const activity = a;
      if(!last || last !== activity.name[0]){
        last = activity.name[0];
        this.alphabeticalMap.push({letter: last, activities:[]});
      }
      this.alphabeticalMap[this.alphabeticalMap.length - 1].activities.push(activity);
    });
  }

}
