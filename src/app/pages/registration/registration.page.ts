import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {

  registrationForm!: FormGroup;
  subscriptionBackButton: Subscription;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido máximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email válido'}
    ],
    username:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido máximo 50 caracteres'},
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido mínimo 6 caracteres'},
    ]
  };

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router,
    private platform: Platform
  ){}

  ngOnDestroy(): void {
    this.subscriptionBackButton.unsubscribe();
  }

  ngOnInit(){
    // hardware back button android
    this.subscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,()=>{
      this.router.navigateByUrl('login');
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
    this.router.navigateByUrl('login');
  }

  async onSubmit(){
    const email: string = this.registrationForm.get('email')?.value;
    const password: string = this.registrationForm.get('password')?.value;
    const username: string = this.registrationForm.get('username')?.value;
    await this.loadingService.showLoading();
    this.authService.register(email,username,password).subscribe({
      next:()=>{
        this.loadingService.dismiss();
        this.registrationForm.reset();
        this.router.navigateByUrl('login');
        this.alertService.showAlert('Registro Exitoso','El registro se completó de manera exitosa. Por favor, inicie sesión',false);
      },
      error:(e)=>{  //email ya registrado en una cuenta
        this.loadingService.dismiss();
        if(e.status !== 0 && e.status !== 500){
          this.toastService.showErrorMessage('email no disponible');
        }
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
