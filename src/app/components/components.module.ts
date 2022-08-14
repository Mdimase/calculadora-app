import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { PopoverHelpIconComponent } from './popover-help-icon/popover-help-icon.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PopoverEditOptionsComponent } from './popover-edit-options/popover-edit-options.component';

@NgModule({
  declarations: [
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    PipesModule
  ],
  exports:[
    EncabezadoComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent
  ]
})
export class ComponentsModule { }
