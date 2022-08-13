import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Actividad } from 'src/app/interfaces/actividad';

@Component({
  selector: 'app-actividades-standar',
  templateUrl: './actividades-standar.page.html',
  styleUrls: ['./actividades-standar.page.scss'],
})
export class ActividadesStandarPage implements OnInit {

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

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

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

}
