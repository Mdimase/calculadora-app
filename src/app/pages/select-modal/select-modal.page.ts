import { Component,Input, OnInit } from '@angular/core';
import { IonInput, ModalController, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { AlertService } from 'src/app/services/alert.service';
import { ModalService } from 'src/app/services/modal.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-select-modal',
  templateUrl: './select-modal.page.html',
  styleUrls: ['./select-modal.page.scss'],
})
export class SelectModalPage implements OnInit {

  @Input() activities: Activity[];
  @Input() minutesObjective: number;
  subscriptionBackButton: Subscription;
  selectedMinutesActivities = 0;
  selectedActivities: Activity[] = [];
  timeExceedEmitted = false;  // flag para mostrar el alert de tiempo excedido una vez solo al pasarse

  customAlert = {
    header: 'Selección de Actividades',
    message: `Selecciona todas las actividades que forman parte de tu plan académico. Opcionalmente, puedes indicar un multiplicador para cada una de ellas`,
    cssClass:'select-alert',
    translucent: true,
    htmlAttributes:{}
  };

  //breakpointMd = false; // breakpoint 768px

  constructor(
    private popoverService: PopoverService,
    private modalCtrl: ModalController,
    private modalService: ModalService,
    private alertService: AlertService,
    private toastService: ToastService,
    private platform: Platform
  ){}

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
    // hardware back button android
    this.subscriptionBackButton = this.platform.backButton.subscribeWithPriority(200,async ()=>{
      await this.back();
    });
  }

  ionViewWillLeave(): void {
    this.subscriptionBackButton.unsubscribe();
  }

  // mensaje de confirmacion + cancelar el modal sin seleccion
  async back(){
    if(await this.alertService.confirm('Desea cancelar la selección actual y regresar ?','Regresar','alert-button-send') === 'confirm'){
      return this.modalCtrl.dismiss([], 'cancel');
    }
  }

  async send(){
    let message = `las actividades seleccionadas <br> cumplen exitosamente <br> el tiempo deseado a virtualizar`;
    let dialog = '';
    /* mensajes de confirmacion */
    if(this.selectedMinutesActivities > this.minutesObjective){
      message = `las actividades seleccionadas <br> superan <br> el tiempo deseado a virtualizar`;
      dialog = 'confirmar el envío igualmente ?';
    }
    if(this.minutesObjective > this.selectedMinutesActivities){
      message = `las actividades seleccionadas <br> no alcanzan <br> el tiempo deseado a virtualizar`;
      dialog = 'confirmar el envío igualmente ?';
    }
    if(await this.alertService.confirm(dialog,'Enviar','alert-button-send',message) === 'confirm'){
      return this.modalCtrl.dismiss(this.selectedActivities, 'confirm');
    }
  }

   /* popover info page*/
   async showPopover(event: any){
    const message = `Seleccione todas las actividades que incluye su plan académico. Para cada una puede indicar un multiplicador que permita aumentar la precisión de la estimación`;
    this.popoverService.simpleMessage(message,event);
  }

  // alerta de tiempo excedido
  /* cada vez que el tiempo estimado acumulado por las actividades seleccionadas supere al objetivo se dispara la alerta.
     solamente se emite el alert una unica vez al superar (si continua agregando actividades no se disparan mas alertas),
     pero al volver a un tiempo inferior al objetivo se limpia el flag, por lo que al superlarlo nuevamente se vuelve a emitir la alerta
  */
  async timeExceeded(){
    if(!this.timeExceedEmitted && this.selectedMinutesActivities > this.minutesObjective && this.minutesObjective !== 0){
      const message = 'las actividades seleccionadas superan el tiempo deseado a virtualizar';
      this.timeExceedEmitted = true;
      await this.alertService.showErrorAlert('Tiempo Excedido',message,true);
    }
    else{
      if(this.selectedMinutesActivities <= this.minutesObjective){  //alert emitida y seleccion acumulada < tiempo objetivo
        this.timeExceedEmitted = false;  // disponible para en caso de superar nuevamente el tiempo objetivo se vuelva a emitir la alerta
      }
    }
  }

  // eliminar una actividad seleccionada
  remove(activity: Activity){
    const index = this.selectedActivities.indexOf(activity);
    this.selectedActivities.splice(index,1);  // eliminar actividad seleccionada
    this.selectedMinutesActivities -= activity.timeMinutes * activity.amount;  // restar el tiempo acumulado de esta actividad
    this.timeExceeded();
  }

  // boton +1
  increment(activity: Activity, input: IonInput){
    if(activity.amount < 1000){
      activity.amount++;
      this.selectedMinutesActivities += activity.timeMinutes;  // sumar tiempo de la actividad seleccionada
      input.value = Number(input.value)+1;
    }
    this.timeExceeded();
  }

  // boton -1
  decrement(activity: Activity, input: IonInput){
    if(activity.amount > 1){
      activity.amount--;
      this.selectedMinutesActivities -= activity.timeMinutes;  // restar el tiempo de la actividad seleccionada
      input.value = Number(input.value)-1;
    }
    this.timeExceeded();
  }

  // cantidad indicada por input
  setAmount(activity: Activity, input: IonInput){
    const value = Number(input.value);
    this.selectedMinutesActivities -= (activity.timeMinutes * activity.amount);  // limpio posible tiempo anteriormente seleccionado para esta actividad
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
    this.selectedMinutesActivities += (activity.timeMinutes * activity.amount);  // actualizo el tiempo acumulado
    this.timeExceeded();
  }

  async showSelectionActivityModal(){
    const activity: Activity = await this.modalService.openSelectionActivityModalPage(this.activities);
    if(activity != null){  // usuario selecciono una actividad
      activity.amount = 1;  //  valor por defecto
      this.selectedMinutesActivities += activity.timeMinutes;  // sumar tiempo de la actividad seleccionada
      this.selectedActivities.push(activity);
      this.timeExceeded();
    }
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
