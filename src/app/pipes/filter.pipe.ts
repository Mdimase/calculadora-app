import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /* filtra elementos de un array que contiene objetivos,
   pasando aquellos que contienen un texto en uno de sus atributos*/
  transform(array: any[], text: string, property: string): any[] {
    if (text === ''){
      return array;
    }
    text = text.toLowerCase();
    const filteredArray = array.filter(item =>item[property].toLowerCase().includes(text));
    return filteredArray.slice(0);
  }

}
