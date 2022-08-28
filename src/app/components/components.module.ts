import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverHelpIconComponent } from './popover-help-icon/popover-help-icon.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { PopoverEditOptionsComponent } from './popover-edit-options/popover-edit-options.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
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
    HeaderComponent,
    PopoverHelpIconComponent,
    PopoverEditOptionsComponent,
  ]
})
export class ComponentsModule { }
