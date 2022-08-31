import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { PopoverService } from 'src/app/services/popover.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.page.html',
  styleUrls: ['./estimation.page.scss'],
})
export class EstimationPage implements OnInit,OnDestroy {

  public errorMessages = {
    subject:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 255 caracteres'}
    ],
    institute:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 255 caracteres'}
    ],
    periods:[
      { type:'required', message: 'campo obligatorio'},
    ],
    activities:[
      { type:'required', message: 'campo obligatorio'},
    ],
    workload:[
      { type:'required', message: 'campo obligatorio'},
      { type:'min', message: 'valor minimo 0'},
    ],
    percent:[
      { type:'required', message: 'campo obligatorio'},
      { type:'min', message: 'valor minimo 0'},
      { type:'max', message: 'valor maximo 100'},
    ]
  };

  customAlert = {
    header: 'Seleccion de Actividades',
    message: 'Selecciona todas aquellas que forman parte de tu plan de actividades para poder realizar la estimacion de tiempos',
    cssClass:'select-alert',
    translucent: true,
  };

  estimationForm!: FormGroup;
  minutesObjetive = 0;
  selectedMinutesActivities = 0;
  activities: Activity[] = [];
  periods: string[] = ['1er cuatrimestre', '2do cuatrimestre', 'anual'];
  pipe = new DatePipe('en-US');
  today = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  private suscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private activitiesService: ActivitiesService,
              private formBuilder: FormBuilder,
              private router: Router, private platform: Platform, private navigationService: NavigationService){
                this.platform.backButton.subscribeWithPriority(10,()=>{
                  this.navigationService.back();
                });
              }

  ngOnInit(): void {
    console.log(this.today);
    this.estimationForm = this.initForm();
  }

  ionViewWillEnter(){
    this.suscription = this.activitiesService.getActivities$().subscribe( activities =>{
       this.activities = activities;
     });
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', [Validators.required, Validators.maxLength(255)],],
      institute: ['',[Validators.required, Validators.maxLength(255)],],
      periods:['',[Validators.required]],
      workload:['',[Validators.required,Validators.min(0)]],
      percent:['',[Validators.required,Validators.min(0),Validators.max(100)]],
      activities:[[],[Validators.required]],
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.estimationForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  async onSubmit(){
    let message = 'las actividades seleccionadas cumplen exitosamente el tiempo deseado a virtualizar ';
    let dialog = '';
    if(this.selectedMinutesActivities > this.minutesObjetive){
      message = 'las actividades seleccionadas ' + this.selectedMinutesActivities + ' (min)' +
      ' superan el tiempo deseado a virtualizar ' + this.minutesObjetive + ' (min)';
      dialog = ' desea confirmar el envio igualmente ?';
    }
    if(this.minutesObjetive > this.selectedMinutesActivities){
      message = 'las actividades seleccionadas ' + this.selectedMinutesActivities + ' (min)' +
      ' no alcanzan el tiempo deseado a virtualizar ' + this.minutesObjetive + ' (min)';
      dialog = ' desea confirmar el envio igualmente ?';
    }
    if(await this.alertService.confirm(dialog,'Enviar','alert-button-send',message) === 'confirm'){
      console.log('enviar estimacion');
      this.estimationForm.reset({activities:[]});
      this.router.navigate(['main/home']);
    }
  }

  ngOnDestroy(): void {
     this.suscription.unsubscribe();
   }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
    this.popoverService.simpleMessage(message,event);
  }

  /* popover info form element*/
  async showPopoverInputWorkload(event: any){
    const message = 'carga horaria total asignada a esta materia';
    this.popoverService.simpleMessage(message,event);
  }

  /* popover info form element*/
  async showPopoverInputVirtualization(event: any){
    const message = 'porcentaje de horas que desea virtualizar sobre el total de la carga horaria';
    this.popoverService.simpleMessage(message,event);
  }

  /* elimina objetos duplicados mediante su id unico */
  /* mover a un utils service */
  deleteRepetead(array){
    const selectionMapArry = array.map(item=>[item.id,item]);  // arreglo de arreglos -> [[id,item],[id,item]]
    const selectionMap = new Map();
    selectionMapArry.map(data =>{  // seteo en el mapa cada arreglo, como no acepta claves repetidas (mismo id) no inserta duplicados
      selectionMap.set(data[0],data[1]);
    });
    return [...selectionMap.values()];  //retorno los items
  }

  toStr(num: number): string{
    return num.toString();
  }

  /* equivalente en minutos de horas */
  toMinutes(hours: number): number{
    return hours*60;
  }

  toHours(minutes: number): number{
    return minutes / 60;
  }

  /* devuelve el valor del porcentaje sobre el valor ingresado */
  valueOfPercent(value: number, percent: number): number{
    return (percent*value)/100;
  }

  getMinutesObjetive(): number{
    const workload: number = this.estimationForm.get('workload')?.value;
    const percent: number = this.estimationForm.get('percent')?.value;
    return this.valueOfPercent(this.toMinutes(workload),percent);  //carga horaria a virtualizar (minutos)
  }

  handle(){
    const selectActivities: Activity[] = this.estimationForm.get('activities')?.value;
    if(selectActivities.length > 0){
      this.handleChange();
    }
    else{
      this.minutesObjetive = this.getMinutesObjetive();
      this.selectedMinutesActivities = 0;
    }
  }

  handleChange(){
    const minutesObjetive: number = this.getMinutesObjetive();
    const selectActivities: Activity[] = this.estimationForm.get('activities')?.value;
    let selectedMinutesActivities = 0;  // sumatoria de la carga horaria de las actividades seleccionadas (minutos)
    selectActivities.map(a =>{
      selectedMinutesActivities+=a.time;
    });
    if(selectedMinutesActivities > minutesObjetive && minutesObjetive !== 0){
      const message = 'las actividades seleccionadas ' + selectedMinutesActivities + ' (min)' +
      ' superan el tiempo deseado a virtualizar ' + minutesObjetive + ' (min)';
      this.alertService.showAlert('Tiempo Excedido',message);
    }
    this.minutesObjetive = minutesObjetive;  // cantidad de horas que se desean virtualizar
    this.selectedMinutesActivities = selectedMinutesActivities; // horas de las actividades seleccionadas
  }

}
