import { Component, Input} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-activities-estimation-modal',
  templateUrl: './activities-estimation-modal.page.html',
  styleUrls: ['./activities-estimation-modal.page.scss'],
})
export class ActivitiesEstimationModalPage{

  @Input() activities: Activity[];
  timePipe = new TimePipe();
  searchValue = '';
  alphabeticalMap = [];

  constructor(private popoverService: PopoverService,
    private alertService: AlertService,
    private activitiesService: ActivitiesService,
    private modalCtrl: ModalController,
    private platform: Platform, private navigationService: NavigationService){}

  ionViewWillEnter(): void{
    // ordenar alfabeticamente por nombre
    this.activitiesService.sortAlphabetically(this.activities);
    this.initAlphabeticalMap();
  }

  initAlphabeticalMap(): void{
    this.alphabeticalMap = [];
    let last: string = null;
    this.activities.forEach((a)=>{
      const activity = a;
      if(!last || last.toLowerCase() !== activity.name[0].toLowerCase()){
        last = activity.name[0];
        this.alphabeticalMap.push({letter: last, activities:[]});
      }
      this.alphabeticalMap[this.alphabeticalMap.length - 1].activities.push(activity);
    });
  }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'listado de actividades seleccionadas en la estimacion';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    //await this.alertService.itemDescription(activity);
    const message = `tiempo estimado: ${this.timePipe.transform(activity.time)} <br><br> cantidad seleccionada: ${activity.amount} 
    <br><br> tiempo total: ${this.timePipe.transform(activity.time * activity.amount)}`;
    await this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  back(){
    return this.modalCtrl.dismiss([], 'cancel');
  }

}
