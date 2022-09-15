import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';

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
      { type:'maxlength', message: 'contenido maximo 50 caracteres'}
    ],
    password:[
      { type:'required', message: 'campo obligatorio'},
      { type:'minlength', message: 'contenido minimo 6 caracteres'},
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,private navigationService: NavigationService ,private platform: Platform){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.navigationService.back();
    });
  }

  ngOnInit() {
    this.changePasswordForm = this.initForm();
  }

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

  onSubmit(){
    const email: string = this.changePasswordForm.get('email')?.value;
    const password: string = this.changePasswordForm.get('password')?.value;
    // peticion http cambio password
    console.log('password changed');
    this.router.navigate(['main/home']);
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
