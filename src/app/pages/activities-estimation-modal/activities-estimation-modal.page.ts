import { Component, Input} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
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
  searchValue = '';

  constructor(private popoverService: PopoverService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private platform: Platform, private navigationService: NavigationService){
      this.platform.backButton.subscribeWithPriority(10,()=>{
        this.navigationService.back();
      });
    }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'listado de actividades seleccionadas en la estimacion';
    this.popoverService.simpleMessage(message,event);
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(activity: Activity){
    this.alertService.itemDescription(activity);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  back(){
    return this.modalCtrl.dismiss([], 'cancel');
  }

}
