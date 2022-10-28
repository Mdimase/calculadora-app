import { Component, Input} from '@angular/core';
import { ModalController} from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(
    private popoverService: PopoverService,
    private alertService: AlertService,
    private activitiesService: ActivitiesService,
    private modalCtrl: ModalController
  ){}

  ionViewWillEnter(): void{
    this.activitiesService.sortAlphabetically(this.activities); // ordenar alfabeticamente por nombre
    this.alphabeticalMap = this.activitiesService.initAlphabeticalMap(this.activities);  // actividades agrupadas la inicial de su nombre
  }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'Listado de actividades seleccionadas en la estimación';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    const message = `Tiempo estimado: ${this.timePipe.transform(activity.timeMinutes)} <br><br> Cantidad seleccionada: ${activity.amount} 
    <br><br> Tiempo total: ${this.timePipe.transform(activity.timeMinutes * activity.amount)}`;
    await this.alertService.itemDescription(activity.name,activity.description,message);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  // cancelar el modal sin retorno
  back(){
    return this.modalCtrl.dismiss([], 'cancel');
  }

}
