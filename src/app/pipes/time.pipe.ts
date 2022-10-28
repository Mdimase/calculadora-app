import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  // formato ->  x Hs x Min
  transform(min: number): string{
    const hours: number = Math.floor(min / 60);
    const minutes: number = min % 60;
    return hours.toString() + ' Hs ' + minutes.toString()  + ' Min';
  }

}
