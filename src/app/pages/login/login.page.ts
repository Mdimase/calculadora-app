import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/interfaces/userDetails';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {

  loginForm!: FormGroup;
  subscriptionBackButton: Subscription;
  rememberEmail: string;
  rememberPassword: string;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido máximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email válido'}
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido mínimo 6 caracteres'},
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private platform: Platform
  ){}

  ngOnDestroy(): void {
    this.subscriptionBackButton.unsubscribe();
  }

  ngOnInit(){
    this.subscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,()=>{
      App.exitApp();
    });
    this.loginForm = this.initForm();
  }

  ionViewWillEnter(){
    // si hay credenciales recordadas, setearlas en el formulario
    this.rememberEmail = this.authService.getRememberEmail();
    this.rememberPassword = this.authService.getRememberPassword();
    if(this.rememberEmail && this.rememberPassword){
      this.loginForm.patchValue({email: this.rememberEmail, password: this.rememberPassword, remember: true});
    }
    else{
      this.loginForm.reset();
    }
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: [this.rememberEmail,
        [Validators.required,Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],],
      password: [this.rememberPassword, [Validators.required, Validators.minLength(6)]],
      remember:[false],
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.loginForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  /* iniciar sesion */
  async onSubmit(){
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;
    const remember: boolean = this.loginForm.get('remember')?.value;
    await this.loadingService.showLoading();
    this.authService.login(email,password,remember).subscribe({
      next:() =>{
        this.authService.getUsernameLogged(email).subscribe({
          next:(details: UserDetails)=>{
            this.loadingService.dismiss();
            if(details.isTemporalPassword){  // viene de recuperar contraseña por mail
              this.router.navigateByUrl('main/change/password');
              this.alertService.showAlert('Actualiza tu contraseña','Ingrese como contraseña actual la recibida en su casilla de correo electrónico',false);
            }
            else{  //  login normal
              this.rememberEmail = this.authService.getRememberEmail();
              this.rememberPassword = this.authService.getRememberPassword();
              this.loginForm.reset({email: this.rememberEmail, password: this.rememberPassword, remember});
              this.router.navigateByUrl('main/home');
              this.toastService.showWelcomeMessage('Bienvenido ' + email);
            }
          }
        });
      },
      error:(e) =>{  //email/contraseña incorrectos
        this.loadingService.dismiss();
        if(e.status !== 0 && e.status !== 500){
          this.toastService.showErrorMessage('email/contraseña incorrecta. Intente nuevamente');
        }
      }
    });
  }

}
