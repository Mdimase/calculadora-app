import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { Estimation } from 'src/app/interfaces/estimation';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AlertService } from 'src/app/services/alert.service';
import { EstimationService } from 'src/app/services/estimation.service';
import { ModalService } from 'src/app/services/modal.service';
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
    year:[
      { type:'required', message: 'campo obligatorio'},
      { type:'min', message: 'valor minimo 1000'},
      { type:'max', message: 'valor maximo 2100'}
    ],
    period:[
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

  estimationForm!: FormGroup;
  minutesObjetive = 0;
  selectedMinutesActivities = 0;
  activities: Activity[] = [];
  selectedActivities: Activity[] = [];
  period: string[] = ['1er cuatrimestre', '2do cuatrimestre', 'anual'];
  private suscription: Subscription;

  constructor(private popoverService: PopoverService,
              private alertService: AlertService,
              private toastService: ToastService,
              private modalService: ModalService,
              private activitiesService: ActivitiesService,
              private estimationService: EstimationService,
              private formBuilder: FormBuilder,
              private router: Router, private platform: Platform, private navigationService: NavigationService){}

  ngOnInit(): void {
    this.estimationForm = this.initForm();
  }

  ionViewWillEnter(){
    this.suscription = this.activitiesService.getActivities$().subscribe( activities =>{
       this.activities = activities;
     });
    this.estimationService.getEstimations$();  //eliminarlo al tener el backend
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      subject: ['', [Validators.required, Validators.maxLength(255)],],
      institute: ['',[Validators.required, Validators.maxLength(255)],],
      year:['',[Validators.required, Validators.min(1000), Validators.max(2100)]],
      period:['',[Validators.required]],
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
      const estimationSend: Estimation = this.estimationForm.value;
      estimationSend.estimatedTime = this.selectedMinutesActivities;
      this.estimationService.addEstimation(estimationSend);
      this.toastService.showMessage('estimacion creada correctamente');
      this.estimationForm.reset({activities:[]});
      this.minutesObjetive = 0;
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

  getMinutesObjetive(): number{
    const workload: number = this.estimationForm.get('workload')?.value;
    const percent: number = this.estimationForm.get('percent')?.value;
    return this.estimationService.valueOfPercent(this.estimationService.toMinutes(workload),percent);  //carga horaria a virtualizar (min)
  }

  handle(){
    if(this.selectedActivities.length > 0){
      this.handleChange(this.selectedActivities);
    }
    else{
      this.minutesObjetive = this.getMinutesObjetive();
      this.selectedMinutesActivities = 0;
    }
  }

  handleChange(selectedActivities: Activity[]){
    this.minutesObjetive = this.getMinutesObjetive();
    this.selectedMinutesActivities = this.estimationService.getMinutesSelected(selectedActivities);
  }

  async showSelectModal(){
    if(this.getMinutesObjetive() === 0){
      this.alertService.showErrorAlert('Error','Por favor indique carga horaria y virtualizacion',true);
    }
    else{
      this.selectedActivities = await this.modalService.openSelectModalPage(this.activities, this.minutesObjetive);
      this.estimationForm.value.activities = this.selectedActivities;
      this.estimationForm.get('activities').setValue(this.selectedActivities);
      this.handleChange(this.selectedActivities);
    }
  }

}
