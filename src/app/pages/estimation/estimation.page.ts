import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.page.html',
  styleUrls: ['./estimation.page.scss'],
})
export class EstimationPage implements OnInit,OnDestroy {

  public errorMessages = {
    subject:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'}
    ],
    institution:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'}
    ],
  };

  customAlert = {
    header: 'Seleccion de Actividades',
    message: 'Selecciona todas aquellas que forman parte de tu plan de actividades para poder realizar la estimacion de tiempos',
    cssClass:'select-alert',
    translucent: true,
  };

  estimationForm!: FormGroup;
  activities: Activity[] = [];
  pipe = new DatePipe('en-US');
  today = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  private suscription: Subscription;

  constructor(private popoverService: PopoverService, private activitiesService: ActivitiesService,private formBuilder: FormBuilder){}
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
      subject: ['', [Validators.required, Validators.maxLength(50)],],
      institution: ['',[Validators.required, Validators.maxLength(50)],],
      activities:[''],
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.estimationForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  onSubmit(){
    //const subject: string = this.estimationForm.get('subject')?.value;
    //const institution: string = this.estimationForm.get('institution')?.value;
  }

  ngOnDestroy(): void {
     this.suscription.unsubscribe();
   }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
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

}
