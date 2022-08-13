import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PopoverHelpIconComponent } from './popover-help-icon/popover-help-icon.component';

@NgModule({
  declarations: [
    EncabezadoComponent,
    PopoverHelpIconComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    EncabezadoComponent,
    PopoverHelpIconComponent
  ]
})
export class ComponentsModule { }
