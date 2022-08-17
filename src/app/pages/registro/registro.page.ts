import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registroForm!: FormGroup;

  public mensajesError = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'pattern', message: 'ingrese un email valido'}
    ],
    username:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'longitud maxima 50 caracteres'},
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'longitud minima 6 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(){
    this.registroForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],],
      username: ['',[Validators.required, Validators.maxLength(50)],],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['']
    }, {validators: this.checkPasswords()});
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.registroForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  regresar(){
    this.router.navigate(['acceso']);
  }

  onSubmit(){
    const email: string = this.registroForm.get('email')?.value;
    const password: string = this.registroForm.get('password')?.value;
    const username: string = this.registroForm.get('username')?.value;
    this.authService.registro(email,username,password);
    this.router.navigate(['acceso']);
  }

  /* validator custom => si son iguales retorna null, sino retorna {notEqual:true}*/
  private checkPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { notEqual: true };
    };
  };

}
