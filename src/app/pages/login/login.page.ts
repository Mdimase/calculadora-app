import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {

  loginForm!: FormGroup;
  suscriptionBackButton: Subscription;
  rememberEmail: string;
  rememberPassword: string;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email valido'}
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido minimo 6 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private toastService: ToastService,
              private authService: AuthService,
              private router: Router, private platform: Platform){}

  ngOnDestroy(): void {
    this.suscriptionBackButton.unsubscribe();
  }

  ngOnInit(){
    this.suscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,()=>{
      App.exitApp();
    });
    this.loginForm = this.initForm();
  }

  ionViewWillEnter(){
    this.rememberEmail = this.authService.getRememberEmail();
    this.rememberPassword = this.authService.getRememberPassword();
    if(this.rememberEmail && this.rememberPassword){
      this.loginForm.patchValue({email: this.rememberEmail, password: this.rememberPassword, remember: true});
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
  onSubmit(){
    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;
    const remember: boolean = this.loginForm.get('remember')?.value;
    this.authService.login(email,password,remember).subscribe({
      next:() =>{
        this.rememberEmail = this.authService.getRememberEmail();
        this.rememberPassword = this.authService.getRememberPassword();
        this.loginForm.reset({email: this.rememberEmail, password: this.rememberPassword, remember});
        this.router.navigate(['main/home']);
        setTimeout(()=>this.toastService.showWelcomeMessage('Bienvenido ' + email),200);
      },
      error:() =>{
        this.toastService.showErrorMessage('email/contraseña incorrecta. Intente nuevamente');
      }
    });
  }

}
