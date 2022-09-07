import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { TimePipe } from 'src/app/pipes/time.pipe';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.page.html',
  styleUrls: ['./select-modal.page.scss'],
})
export class SelectModalPage implements OnInit {

  @Input() activities: Activity[];
  @Input() minutesObjetive: number;
  selectedMinutesActivities = 0;
  selectedActivities: Activity[] = [];
  selectPlaceholder = 'Agregar Actividad';
  timeExceedEmitted = false;  // flag para mostrar el alert de tiempo excedido una vez solo al pasarse

  customAlert = {
    header: 'Seleccion de Actividades',
    // eslint-disable-next-line max-len
    message: `Selecciona todas las actividades que forman parte de tu plan academico. Opcionalmente puedes indicar un multiplicador para cada una de ellas`,
    cssClass:'select-alert',
    translucent: true,
  };

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
    this.alertService.showAlert(this.customAlert.header,this.customAlert.message,false);
  }

  async back(){
    if(await this.alertService.confirm('Desea cancelar la seleccion actual y regresar ?','Regresar','alert-button-send') === 'confirm'){
      return this.modalCtrl.dismiss([], 'cancel');
    }
  }

  async send(){
    let message = `las actividades seleccionadas <br> cumplen exitosamente <br> el tiempo deseado a virtualizar`;
    let dialog = '';
    if(this.selectedMinutesActivities > this.minutesObjetive){
      message = `las actividades seleccionadas <br> superan <br> el tiempo deseado a virtualizar`;
      dialog = 'confirmar el envio igualmente ?';
    }
    if(this.minutesObjetive > this.selectedMinutesActivities){
      message = `las actividades seleccionadas <br> no alcanzan <br> el tiempo deseado a virtualizar`;
      dialog = 'confirmar el envio igualmente ?';
    }
    if(await this.alertService.confirm(dialog,'Enviar','alert-button-send',message) === 'confirm'){
      return this.modalCtrl.dismiss(this.selectedActivities, 'confirm');
    }
  }

   /* popover info page*/
   async showPopover(event: any){
    const message = `Seleccione todas las actividades que incluye su plan academico. Para cada una puede indicar un multiplicador`;
    this.popoverService.simpleMessage(message,event);
  }

  /* cada vez que el tiempo estimado acumulado por las actividades seleccionadas supere al objetivo se dispara la alerta.
     solamente se emite el alert una unica vez al superar (si continua agregando actividades no se disparan mas alertas),
     pero al volver a un tiempo inferior al objetivo se limpia el flag, por lo que al superlarlo nuevamente se vuelve a emitir la alerta
  */
  async timeExceeded(){
    if(!this.timeExceedEmitted && this.selectedMinutesActivities > this.minutesObjetive && this.minutesObjetive !== 0){
      const message = 'las actividades seleccionadas superan el tiempo deseado a virtualizar';
      this.timeExceedEmitted = true;
      await this.alertService.showErrorAlert('Tiempo Excedido',message,true);
    }
    else{
      if(this.selectedMinutesActivities < this.minutesObjetive){  //alert emitida y seleccion acumulada < tiempo objetivo
        this.timeExceedEmitted = false;  // disponible para en caso de superar nuevamente el tiempo objetivo se vuelva a emitir la alerta
      }
    }
  }

  select(event){
    if(event.target.value){
      const activity: Activity = {
        id: event.target.value.id,
        name: event.target.value.name,
        description: event.target.value.description,
        time: event.target.value.time,
        type: event.target.value.type,
        amount: 1
      };
      this.selectedMinutesActivities += activity.time;
      this.selectedActivities.push(activity);
      this.timeExceeded();
    }
    event.target.value = undefined;
  }

  remove(activity: Activity){
    const index = this.selectedActivities.indexOf(activity);
    this.selectedActivities.splice(index,1);  // eliminar actividad seleccionada
    this.selectedMinutesActivities -= activity.time * activity.amount;  // restar el tiempo acumulado de esta actividad
    this.timeExceeded();
  }

  increment(activity: Activity){
    if(activity.amount < 1000){
      activity.amount++;
      this.selectedMinutesActivities += activity.time;
    }
    this.timeExceeded();
  }

  decrement(activity: Activity){
    if(activity.amount > 1){
      activity.amount--;
      this.selectedMinutesActivities -= activity.time;
    }
    this.timeExceeded();
  }

}
