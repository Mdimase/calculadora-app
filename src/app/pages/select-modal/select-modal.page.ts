import { Component,Input, OnInit } from '@angular/core';
import { IonInput, ModalController, Platform } from '@ionic/angular';
import { Activity } from 'src/app/interfaces/activity';
import { AlertService } from 'src/app/services/alert.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ToastService } from 'src/app/services/toast.service';

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
  searchValue = '';
  timeExceedEmitted = false;  // flag para mostrar el alert de tiempo excedido una vez solo al pasarse

  customAlert = {
    header: 'Seleccion de Actividades',
    // eslint-disable-next-line max-len
    message: `Selecciona todas las actividades que forman parte de tu plan academico. Opcionalmente, puedes indicar un multiplicador para cada una de ellas`,
    cssClass:'select-alert',
    translucent: true,
    htmlAttributes:{}
  };

  //breakpointMd = false; // breakpoint 768px

  constructor(private popoverService: PopoverService,
              private modalCtrl: ModalController,
              private alertService: AlertService,
              private toastService: ToastService,
              private platform: Platform){  //priority by default for alerts is 100, to override indicates priority higher than 100
                this.platform.backButton.subscribeWithPriority(10000,async ()=>{
                  await this.back();
                });
              }
/*
@HostListener('window:resize',['$event'])
  private onRisize(event){
    const newWidth = event.target.screen.width;
    this.toggleBreakpointMd(newWidth);
  }
*/
  ngOnInit(){
    //const width = this.platform.width();
    //this.toggleBreakpointMd(width);
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
      if(this.selectedMinutesActivities <= this.minutesObjetive){  //alert emitida y seleccion acumulada < tiempo objetivo
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

  increment(activity: Activity, input: IonInput){
    if(activity.amount < 1000){
      activity.amount++;
      this.selectedMinutesActivities += activity.time;
      input.value = Number(input.value)+1;
    }
    this.timeExceeded();
  }

  setAmount(activity: Activity, input: IonInput){
    const value = Number(input.value);
    this.selectedMinutesActivities -= (activity.time * activity.amount);  // limpio tiempo anterior
    if(value < 1000 && value > 0){
      activity.amount = value;
    }
    else{
      if(value){
        activity.amount = 1; //valor por defecto 1 cuando ingresen valores erroneos
        input.value = 1;
        this.toastService.showErrorMessage('ingrese un valor entre 1 y 1000');
      }
    }
    this.selectedMinutesActivities += (activity.time * activity.amount);  // actualizo el tiempo acumulado
    this.timeExceeded();
  }

  decrement(activity: Activity, input: IonInput){
    if(activity.amount > 1){
      activity.amount--;
      this.selectedMinutesActivities -= activity.time;
      input.value = Number(input.value)-1;
    }
    this.timeExceeded();
  }
/*
  private toggleBreakpointMd(width: number){
    if(width >= 768){
      this.breakpointMd = true;
    }
    else{
      this.breakpointMd = false;
    }
  }
*/
}
