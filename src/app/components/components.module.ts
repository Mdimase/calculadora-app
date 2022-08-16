import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PopoverHelpIconComponent } from './popover-help-icon/popover-help-icon.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PopoverEditOptionsComponent } from './popover-edit-options/popover-edit-options.component';
import { ActividadFormComponent } from './actividad-form/actividad-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
    ActividadFormComponent,
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    PipesModule,
    ReactiveFormsModule,
  ],
  exports:[
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
    ActividadFormComponent
  ]
})
export class ComponentsModule { }
