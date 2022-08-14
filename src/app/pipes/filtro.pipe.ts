import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, propiedad: string): any[] {
    if (texto === ''){
      return arreglo;
    }
    texto = texto.toLowerCase();
    const arregloFiltrado = arreglo.filter(item =>item[propiedad].toLowerCase().includes(texto));
    return arregloFiltrado.slice(0);
  }

}
