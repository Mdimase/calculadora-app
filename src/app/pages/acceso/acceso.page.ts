import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {

  accesoForm!: FormGroup;

  public mensajesError = {
    email:[
      { type:'required', message: 'campo email es obligatorio'},
      { type:'minlength', message: 'campo email no puede ser menor de 5 caracteres'},
      { type:'pattern', message: 'ingrese un email valido'}
    ],
    password:[
      { type:'required', message: 'campo contraseña es obligatorio'},
      { type:'minlength', message: 'campo contraseña no puede ser menor de 5 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(){
    this.accesoForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.minLength(5),Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.accesoForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  /* iniciar sesion */
  onSubmit(){
    // hacer login exitoso y erroneo con alertas o toast
  }

}
