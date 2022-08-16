import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-actividad-form',
  templateUrl: './actividad-form.component.html',
  styleUrls: ['./actividad-form.component.scss'],
})
export class ActividadFormComponent implements OnInit {

  @Input() actividadActual: Actividad;
  @Output() actividad = new EventEmitter<Actividad>();
  actividadForm!: FormGroup;

  public mensajesError = {
    nombre:[
      { type:'required', message: 'nombre es requerido'},
      { type:'minlength', message: 'nombre no puede ser menor de 5 caracteres'},
      { type:'maxlength', message: 'nombre no puede ser mayor de 50 caracteres'}
    ],
    tiempo:[
      { type:'required', message: 'tiempo es requerido'},
    ],
    descripcion:[
      { type:'maxlength', message: 'descripcion no puede ser mayor de 255 caracteres'}
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(){
    if(this.actividadActual){
      this.actividadForm=this.initForm(this.actividadActual.nombre,this.actividadActual.tiempo.toString(),this.actividadActual.descripcion);
    }
    else{
      this.actividadForm = this.initForm();
    }
  }

  initForm(nombre: string = '',tiempo: string = '', descripcion: string = ''): FormGroup {
    return this.formBuilder.group({
      nombre: [nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)],],
      tiempo: [tiempo, [Validators.required],],
      descripcion: [descripcion, [Validators.maxLength(255)]]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.actividadForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  /* emite la actividad al al modal page */
  onSubmit(){
    this.actividad.emit(this.actividadForm.value);
  }


}
