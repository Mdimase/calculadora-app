import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.scss'],
})
export class FormActivityComponent implements OnInit {

  @Input() currentActivity: Activity;
  @Output() activity = new EventEmitter<Activity>();
  activityForm!: FormGroup;

  public errorMessages = {
    name:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido minimo 5 caracteres'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'}
    ],
    time:[
      { type:'required', message: 'campo obligatorio'},
    ],
    description:[
      { type:'maxlength', message: 'contenido 255 caracteres'}
    ]
  };

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void{
    if(this.currentActivity){
      this.activityForm=this.initForm(this.currentActivity.name,this.currentActivity.time.toString(),this.currentActivity.description);
    }
    else{
      this.activityForm = this.initForm();
    }
  }

  initForm(name: string = '',time: string = '', description: string = ''): FormGroup {
    return this.formBuilder.group({
      name: [name, [Validators.required, Validators.minLength(5), Validators.maxLength(50)],],
      time: [time, [Validators.required],],
      description: [description, [Validators.maxLength(255)]]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error): boolean{
    const field = this.activityForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  /* emite la actividad al modal page */
  onSubmit(): void{
    this.activity.emit(this.activityForm.value);
  }

}
