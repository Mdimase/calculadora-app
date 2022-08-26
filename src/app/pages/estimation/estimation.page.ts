import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Activity } from 'src/app/interfaces/activity';
import { ActivitiesService } from 'src/app/services/activities.service';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.page.html',
  styleUrls: ['./estimation.page.scss'],
})
export class EstimationPage implements OnDestroy {

  customAlert = {
    header: 'Seleccion de Actividades',
    message: 'Selecciona todas aquellas que forman parte de tu plan de actividades para poder realizar la estimacion de tiempos',
    cssClass:'select-alert',
    translucent: true,
  };

  activities: Activity[] = [];
  selected = '';

  private suscription: Subscription;

  constructor(private popoverService: PopoverService, private activitiesService: ActivitiesService) { }

  ionViewWillEnter(){
    this.suscription = this.activitiesService.getActivities$().subscribe( activities =>{
       this.activities = activities;
     });
  }

  ngOnDestroy(): void {
     this.suscription.unsubscribe();
   }

  /* popover info page*/
  async showPopover(event: any){
    const message = 'herramienta que permite estimar la duracion de las actividades academicas que componen su plan';
    this.popoverService.simpleMessage(message,event);
  }

  /* elimina objetos duplicados mediante su id unico */
  /* mover a un utils service */
  deleteRepetead(array){
    const selectionMapArry = array.map(item=>[item.id,item]);  // arreglo de arreglos -> [[id,item],[id,item]]
    const selectionMap = new Map();
    selectionMapArry.map(data =>{  // seteo en el mapa cada arreglo, como no acepta claves repetidas (mismo id) no inserta duplicados
      selectionMap.set(data[0],data[1]);
    });
    return [...selectionMap.values()];  //retorno los items
  }

}
