import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  changePasswordForm!: FormGroup;

  public errorMessages = {
    current:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido máximo 50 caracteres'}
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido mínimo 6 caracteres'},
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private router: Router
  ){}

  ngOnInit() {
    this.changePasswordForm = this.initForm();
  }

  // inicializacion del formulario con valores por defecto y validaciones
  initForm(): FormGroup {
    return this.formBuilder.group({
      current: ['', [Validators.required,Validators.maxLength(50)],],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['']
    }, {validators: this.checkPasswords()});
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.changePasswordForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  async onSubmit(){
    const currentPassword: string = this.changePasswordForm.get('current')?.value;
    const newPassword: string = this.changePasswordForm.get('password')?.value;
    await this.loadingService.showLoading();
    this.authService.changePassword(currentPassword,newPassword).subscribe({
      next: ()=>{
        this.loadingService.dismiss();
        this.toastService.showMessage('Cambio de contraseña exitoso');
        this.authService.logout();
        this.router.navigateByUrl('login');
      },
      error: (e)=>{
        this.loadingService.dismiss();
        if(e.status !== 0 && e.status !== 500){
          this.toastService.showErrorMessage('contraseña actual incorrecta. Intente nuevamente');
        }
      }
    });
  }

  /* validator custom verifica igualdad de contraseñas
  => si son iguales retorna null, sino retorna {notEqual:true}*/
  private checkPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('password')?.value;
      const confirmPassword = formGroup.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { notEqual: true };
    };
  };

}
