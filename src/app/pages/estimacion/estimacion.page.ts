import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actividad } from 'src/app/interfaces/actividad';
import { ActividadesService } from 'src/app/services/actividades.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimacion',
  templateUrl: './estimacion.page.html',
  styleUrls: ['./estimacion.page.scss'],
})
export class EstimacionPage implements OnDestroy {

  alertaPersonalizada = {
    header: 'Seleccion de Actividades',
    message: 'Selecciona todas aquellas que forman parte de tu plan de actividades para poder realizar la estimacion de tiempos',
    cssClass:'select-alert',
    translucent: true,
  };

  actividades: Actividad[] = [];
  actividadesSeleccionadas: Actividad[]=[];
  seleccionadas = '1,2,3';

  private suscripcion: Subscription;

  constructor(private popoverService: PopoverService, private actividadesService: ActividadesService) { }

  ionViewWillEnter(){
   this.suscripcion = this.actividadesService.getActividades$().subscribe( actividades =>{
      this.actividades = actividades;
      console.log(this.actividades);
    });
  }

  ngOnDestroy(): void {
    console.log('estimacion destruida');
    this.suscripcion.unsubscribe();
  }

  /* popover info page*/
  async mostrarPopover(evento: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
    this.popoverService.simpleMessage(message,evento);
  }

  /* elimina objetos duplicados mediante su id unico */
  /* mover a un utils service */
  eliminarDuplicados(arreglo){
    const seleccionMapArry = arreglo.map(item=>[item.id,item]);  // arreglo de arreglos -> [[id,item],[id,item]]
    const seleccionMap = new Map();
    seleccionMapArry.map(data =>{  // seteo en el mapa cada arreglo, como no acepta claves repetidas (mismo id) no inserta duplicados
      seleccionMap.set(data[0],data[1]);
    });
    return [...seleccionMap.values()];  //retorno los items
  }

  handleChange(ev) {
    this.actividadesSeleccionadas = this.eliminarDuplicados(ev.target.value);
    console.log(this.actividadesSeleccionadas);
  }

  compareWith(o1, o2) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((o) => o.id === o1.id);
    }

    return o1.id === o2.id;
  }

}
