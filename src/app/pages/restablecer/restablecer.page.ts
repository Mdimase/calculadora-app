import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  resetForm!: FormGroup;

  public mensajesError = {
    email:[
      { type:'required', message: 'campo obligatorio'},
      { type:'pattern', message: 'ingrese un email valido'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(){
    this.resetForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-z]{2,4}')],]
    });
  }

  /* determina si un input presenta un determinado tipo de error */
  isInvalid(fieldName: string, error){
    const field = this.resetForm.get(fieldName);
    return field.hasError(error.type) && (field.dirty || field.touched);
  }

  regresar(){
    this.router.navigate(['acceso']);
  }

  /* iniciar sesion */
  onSubmit(){
    const email: string = this.resetForm.get('email')?.value;
    // logica para resetear la password enviando una nueva al email en cuestion
    this.router.navigate(['acceso']);
  }

}
