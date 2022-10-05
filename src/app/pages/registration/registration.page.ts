import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {

  registrationForm!: FormGroup;
  subcriptionBackButton: Subscription;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email valido'}
    ],
    username:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'},
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido minimo 6 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder, 
              private authService: AuthService,
              private alertService: AlertService,
              private toastService: ToastService,
              private router: Router,
              private platform: Platform){}

  ngOnDestroy(): void {
    this.subcriptionBackButton.unsubscribe();
  }

  ngOnInit(){
    this.subcriptionBackButton = this.platform.backButton.subscribeWithPriority(10,()=>{
      this.router.navigate(['login']);
    });
    this.registrationForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],],
      username: ['',[Validators.required, Validators.maxLength(50)],],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['']
    }, {validators: this.checkPasswords()});
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.registrationForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  back(){
    this.router.navigate(['login']);
  }

  onSubmit(){
    const email: string = this.registrationForm.get('email')?.value;
    const password: string = this.registrationForm.get('password')?.value;
    const username: string = this.registrationForm.get('username')?.value;
    this.authService.register(email,username,password).subscribe({
      next:()=>{
        this.registrationForm.reset();
        this.router.navigate(['login']);
        this.alertService.showAlert('Registro Existoso','El registro se completo de manera exitosa. Por favor, inicie sesion',false);
      },
      error:()=>{
        this.toastService.showErrorMessage('email no disponible');
      }
    });
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
