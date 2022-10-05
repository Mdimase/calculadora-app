import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit, OnDestroy {

  resetForm!: FormGroup;
  suscriptionBackButton: Subscription;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email valido'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastService: ToastService,
              private alertService: AlertService,
              private router: Router,
              private platform: Platform){}

  ngOnDestroy(): void {
    this.suscriptionBackButton.unsubscribe();
  }

  ngOnInit(){
    this.suscriptionBackButton = this.platform.backButton.subscribeWithPriority(10,()=>{
      this.router.navigate(['login']);
    });
    this.resetForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required,Validators.maxLength(50),Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.resetForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  back(){
    this.router.navigate(['login']);
  }

  /* iniciar sesion */
  onSubmit(){
    const email: string = this.resetForm.get('email')?.value;
    this.authService.reset(email).subscribe({
      next:()=>{
        this.router.navigateByUrl('login');
        this.alertService.showAlert('Reestablecer Contraseña','Inicie sesion con la contraseña temporal recibida en su casilla de correo electronico',false);
      },
      error:()=>{
        this.toastService.showErrorMessage('email inexistente. Intente nuevamente');
      }
    });
    this.router.navigate(['login']);
  }

}
