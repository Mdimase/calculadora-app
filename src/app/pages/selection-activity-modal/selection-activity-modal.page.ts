import { Component, Input, OnDestroy} from '@angular/core';
import { IonCheckbox, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-selection-activity-modal',
  templateUrl: './selection-activity-modal.page.html',
  styleUrls: ['./selection-activity-modal.page.scss'],
})
export class SelectionActivityModalPage implements OnDestroy{

  @Input() activities: Activity[];
  subscriptionBackButton: Subscription;
  searchValue = '';
  alphabeticalMap = [];
  lastCheckBox: IonCheckbox;
  selectedActivity: Activity = null;
  timePipe = new TimePipe();

  constructor(
    private popoverService: PopoverService, 
    private modalCtrl: ModalController, 
    private activitiesService: ActivitiesService,
    private alertService: AlertService,
    private platform: Platform
  ){}

  ngOnDestroy(): void {
    this.subscriptionBackButton.unsubscribe();
  }

  ionViewWillEnter(){
    this.activitiesService.sortAlphabetically(this.activities);
    this.alphabeticalMap = this.activitiesService.initAlphabeticalMap(this.activities);
    this.subscriptionBackButton =  this.platform.backButton.subscribeWithPriority(300,()=>{
      this.back();
    });
  }

   /* popover info page*/
   async showPopover(event: any){
    const message = 'Selecciona una actividad para incorporarla a tu plan académico';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `Tiempo estimado: ${this.timePipe.transform(activity.timeMinutes)}`;
    this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  // cancelar modal y retornar nada
  back(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // cancelar modal y retornar la actividad seleccionada
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

}
