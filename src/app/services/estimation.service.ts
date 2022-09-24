/* eslint-disable max-len */
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
        {id:1,institute:'UNNOBA',subject:'IPI',year:2022,period:'1er cuatrimestre',workload:20,percent:50,dateCreation:this.today,estimatedTime:500,
        activities:[
          {id:1,name:'Lectura libro (1 pag)',description:'lectura de texto en formato paginas (libros, informes, artículos de investigación, documentos, etc)',time:3, type:Type.standard, amount:25},
          {id:7,name:'Encuentro sincronico (meeting)', description:'clase sincrónica mediante una plataforma de meeting',time:30, type:Type.standard, amount:3},
          {id:4,name:'Cuestionario tiempo definido', description:'cuestionario de preguntas con un tiempo establecido manualmente',time:1, type:Type.standard, amount:90},
          {id:2,name:'Reproducción contenido audiovisual', description:'interacción con contenido multimedia (audios, podcast, videos, etc) ',time:1, type:Type.standard, amount:45},
          {id:3,name:'Intervencion en foro', description:'interacción en un foro (publicación de información, debate con compañeros, lectura de opiniones, etc)',time:20, type:Type.standard, amount:1},
          {id:1,name:'Lectura libro (1 pag)',description:'lectura de texto en formato paginas (libros, informes, artículos de investigación, documentos, etc)',time:3, type:Type.standard, amount:43},
          {id:5,name:'Cuestionario multiple choice (1 pregunta)', description:'preguntas de opción múltiple estilo test (respuestas rápidas y concretas)',time:3, type:Type.standard, amount:10},
          {id:2,name:'Reproducción contenido audiovisual', description:'interacción con contenido multimedia (audios, podcast, videos, etc) ',time:1, type:Type.standard, amount:21},
        ]}
      ];
      //peticion http + actualizacion de this.estimations
      this.estimations$.next(this.estimations);
    }
    return this.estimations$.asObservable();
  }

  setEstimations$(estimations: Estimation[]){
    this.estimations = estimations;
    this.estimations$.next(this.estimations);
  }

  addEstimation(estimation: Estimation): void{
    // peticion http
    // const ids: number[] = this.activitiesService.getIds(estimation.activities);
    estimation.id = this.estimations[this.estimations.length - 1].id + 1;  // simular creacion del id
    estimation.dateCreation = this.today;  //quizas lo genera el backend
    this.estimations.push(estimation);  //actualizacion del arreglo
    this.estimations$.next(this.estimations);  // notificacion a los subcriptos
  }

  deleteEstimation(estimation: Estimation){
    // peticion http
    /* simulacion de eliminar una estimacion */
    this.estimations = this.estimations.filter((e)=>e.id !== estimation.id);
    this.estimations$.next(this.estimations);
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
      selectedMinutesActivities += (a.time * a.amount);
    });
    return selectedMinutesActivities;
  }

  getActivities(idEstimation: number): Activity[]{
    let activities: Activity[];
    this.estimations.map((e)=>{
      if(e.id === idEstimation){
        activities = e.activities;
      }
    });
    return activities;
  }

}
