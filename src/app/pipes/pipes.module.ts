import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { TimePipe } from './time.pipe';

@NgModule({
  declarations: [
    FilterPipe,
    TimePipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe, TimePipe
  ]
})
export class PipesModule { }
