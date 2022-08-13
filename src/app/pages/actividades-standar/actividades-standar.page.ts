import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, PopoverController } from '@ionic/angular';
import { PopoverHelpIconComponent } from 'src/app/components/popover-help-icon/popover-help-icon.component';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-actividades-standar',
  templateUrl: './actividades-standar.page.html',
  styleUrls: ['./actividades-standar.page.scss'],
})
export class ActividadesStandarPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinteScroll: IonInfiniteScroll;

  busqueda = '';

  actividades: Actividad[] = [
    {nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
  ];

  actividadesNext: Actividad[] = [
    {nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
  ];

  constructor(private alertController: AlertController, private popoverController: PopoverController) { }

  ngOnInit() {
  }

  /* alert -> informacion extra de una actividad*/
  async presentAlert(actividad: Actividad) {
    const alert = await this.alertController.create({
      header: actividad.nombre,
      mode:'ios',
      cssClass:'custom-alert',
      subHeader: actividad.descripcion,
      message: 'tiempo estimado: ' + actividad.tiempo.toString() + ' minutos',
      buttons: ['OK'],
    });
    await alert.present();
  }

  /*buscar en la lista -> search bar*/
  buscar(event){
    this.busqueda = event.detail.value;
  }

  /* popover info page*/
  async mostrarPopover(evento){
    const message = 'actividades academicas comumente utilizadas en plataformas de aprendizaje virtual';
    const popover = await this.popoverController.create({
      component:PopoverHelpIconComponent,
      componentProps:{message},
      animated:true,
      event:evento,
      mode:'ios'
    });
    await popover.present();

    /* para popovers que devuelven data*/
    const {data} = await popover.onWillDismiss();
    console.log(data);

  }

  /*infinte scroll cargar mas contenido*/
  loadData(event){

  /* simulacion de peticion asincrona de datos*/
  setTimeout(()=>{

    if(this.actividades.length > 50){  //deshabilitar el infinte scroll
      this.infinteScroll.disabled = true;
    }
    event.target.complete();
  },1000);

  }

}
