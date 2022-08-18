import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PopoverHelpIconComponent } from './popover-help-icon/popover-help-icon.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PopoverEditOptionsComponent } from './popover-edit-options/popover-edit-options.component';
import { ActividadFormComponent } from './actividad-form/actividad-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
    ActividadFormComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipesModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports:[
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
    ActividadFormComponent,
    MenuComponent
  ]
})
export class ComponentsModule { }
