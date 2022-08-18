import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.page.html',
  styleUrls: ['./acceso.page.scss'],
})
export class AccesoPage implements OnInit {

  accesoForm!: FormGroup;

  public mensajesError = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'pattern', message: 'ingrese un email valido'}
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'longitud minima 6 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.accesoForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.accesoForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  /* iniciar sesion */
  iniciarSesion(){
    const email: string = this.accesoForm.get('email')?.value;
    const password: string = this.accesoForm.get('password')?.value;
    if(this.authService.iniciarSesion(email,password)){
      console.log('sesion iniciada');
      this.router.navigate(['principal/inicio']);
    }
    else{
      console.log('email/contraseña erronea. intente nuevamente');
    }
  }

}
