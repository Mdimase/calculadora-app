import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.page.html',
  styleUrls: ['./select-modal.page.scss'],
})
export class SelectModalPage implements OnInit {

  @Input() activities: Activity[];

  searchValue = '';

  constructor(private popoverService: PopoverService,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              private platform: Platform){  //priority by default for alerts is 100, to override indicates priority higher than 100
                this.platform.backButton.subscribeWithPriority(10000,async ()=>{
                  await this.back();
                });
              }

  ngOnInit(){
  }

  async back(){
    if(await this.alertService.confirm('Desea cancelar la seleccion actual y regresar ?','Regresar','alert-button-send') === 'confirm'){
      return this.modalCtrl.dismiss([], 'cancel');
    }
  }

  send(){
    return this.modalCtrl.dismiss(this.activities.filter((a)=>a.checked), 'confirm');
  }

   /* popover info page*/
   async showPopover(event: any){
    const message = 'Seleccione todas las actividades que incluye su plan academico';
    this.popoverService.simpleMessage(message,event);
  }

  /*buscar en la lista -> search bar*/
  search(event){
    this.searchValue = event.detail.value;
  }

  increment(activity: Activity){
    if(activity.cantidad < 20){
      activity.cantidad++;
    }
  }

  decrement(activity: Activity){
    if(activity.cantidad > 0){
      activity.cantidad--;
    }
  }

}
