import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  resetForm!: FormGroup;

  public errorMessages = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'maxlength', message: 'contenido maximo 50 caracteres'},
      { type:'pattern', message: 'ingrese un email valido'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router, private platform: Platform){
    this.platform.backButton.subscribeWithPriority(10,()=>{
      this.router.navigate(['login']);
    });
  }

  ngOnInit(){
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
    // logica para resetear la password enviando una nueva al email en cuestion
    this.router.navigate(['login']);
  }

}
