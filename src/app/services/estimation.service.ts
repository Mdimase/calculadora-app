import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Activity, Type } from '../interfaces/activity';
import { Estimation } from '../interfaces/estimation';
import { ActivitiesService } from './activities.service';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  pipe = new DatePipe('en-US');
  today = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  private estimations: Estimation[] = [];
  private estimations$: BehaviorSubject<Estimation[]> = new BehaviorSubject<Estimation[]>(this.estimations);

  constructor(private activitiesService: ActivitiesService){}

  getEstimations$(): Observable<Estimation[]>{
    if(this.estimations.length === 0){
      this.estimations = [
        {id:1,institue:'UNNOBA',subject:'IPI',year:2022,period:'1er cuatrimestre',workload:100,percent:50,dateCreation:this.today,
        activities:[
          {id:2,name:'Lectura de unidad de un libro (30 pag)',description:'descripcion de esta actividad',time:25, type:Type.standard},
          {id:1,name:'presentacion en grupos de tp final', description:'descripcion de esta actividad',time:50, type:Type.standard},
          {id:3,name:'Actividad 3', description:'descripcion de esta actividad la verdad que es muy buena',time:45, type:Type.standard},
          {id:1,name:'Actividad 1', description:'descripcion de esta actividad la verdad que es muy buena',time:50, type:Type.custom},
          {id:2,name:'Actividad 2', description:'descripcion de esta actividad la verdad que es muy buena',time:25, type:Type.custom}]},
        {id:2,institue:'UNNOBA',subject:'PI',year:2022,period:'2do cuatrimestre',workload:80,percent:70,dateCreation:this.today,
        activities:[
          {id:2,name:'Lectura de unidad de un libro (30 pag)',description:'descripcion de esta actividad',time:25, type:Type.standard},
          {id:1,name:'presentacion en grupos de tp final', description:'descripcion de esta actividad',time:50, type:Type.standard},
          {id:1,name:'Actividad 1', description:'descripcion de esta actividad la verdad que es muy buena',time:50, type:Type.custom},
          {id:2,name:'Actividad 2', description:'descripcion de esta actividad la verdad que es muy buena',time:25, type:Type.custom}]},
      ];
      //peticion http + actualizacion de this.estimations
      this.estimations$.next(this.estimations);
    }
    return this.estimations$.asObservable();
  }

  addEstimation(estimation: Estimation): void{
    // peticion http
    // const ids: number[] = this.activitiesService.getIds(estimation.activities);
    estimation.id = this.estimations[this.estimations.length - 1].id + 1;  // simular creacion del id
    estimation.dateCreation = this.today;  //quizas lo genera el backend
    this.estimations.push(estimation);  //actualizacion del arreglo
    this.estimations$.next(this.estimations);  // notificacion a los subcriptos
  }

  /* equivalente en minutos de horas */
  toMinutes(hours: number): number{
    return hours*60;
  }

  /* devuelve el valor del porcentaje sobre el valor ingresado */
  valueOfPercent(value: number, percent: number): number{
    return (percent*value)/100;
  }

  getMinutesSelected(activities: Activity[]): number{
    let selectedMinutesActivities = 0;  // sumatoria de la carga horaria de las actividades seleccionadas (minutos)
    activities.map(a =>{
      selectedMinutesActivities += (a.time * a.cantidad);
    });
    return selectedMinutesActivities;
  }

}
