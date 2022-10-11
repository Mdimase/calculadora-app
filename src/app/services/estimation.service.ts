/* eslint-disable max-len */
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activity} from '../interfaces/activity';
import { Estimation } from '../interfaces/estimation';

const ESTIMATIONS_PATH = environment.API_URL + 'estimations';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  pipe = new DatePipe('en-US');
  today = this.pipe.transform(Date.now(), 'dd/MM/yyyy');
  private estimations: Estimation[] = [];
  private estimations$: BehaviorSubject<Estimation[]> = new BehaviorSubject<Estimation[]>(this.estimations);

  constructor(private http: HttpClient){}

  getEstimations$(): Observable<Estimation[]>{
    if(this.estimations.length === 0){
      this.estimations = [
        {id:1,institute:'UNNOBA',subject:'IPI',year:2022,period:'1er cuatrimestre',workload:20,percent:50,dateCreation:this.today,estimatedTime:500,
        activities:[
          {id:1,name:'Lectura libro (1 pag)',description:'lectura de texto en formato paginas (libros, informes, artículos de investigación, documentos, etc)',time_minutes:3, custom:false, amount:25},
          {id:7,name:'Encuentro sincronico (meeting)', description:'clase sincrónica mediante una plataforma de meeting',time_minutes:30, custom:false, amount:3},
          {id:4,name:'Cuestionario tiempo definido', description:'cuestionario de preguntas con un tiempo establecido manualmente',time_minutes:1, custom:false, amount:90},
          {id:2,name:'Reproducción contenido audiovisual', description:'interacción con contenido multimedia (audios, podcast, videos, etc) ',time_minutes:1, custom:false, amount:45},
          {id:3,name:'Intervencion en foro', description:'interacción en un foro (publicación de información, debate con compañeros, lectura de opiniones, etc)',time_minutes:20, custom:false, amount:1},
          {id:1,name:'Lectura libro (1 pag)',description:'lectura de texto en formato paginas (libros, informes, artículos de investigación, documentos, etc)',time_minutes:3, custom:false, amount:43},
          {id:5,name:'Cuestionario multiple choice (1 pregunta)', description:'preguntas de opción múltiple estilo test (respuestas rápidas y concretas)',time_minutes:3, custom:false, amount:10},
          {id:2,name:'Reproducción contenido audiovisual', description:'interacción con contenido multimedia (audios, podcast, videos, etc) ',time_minutes:1, custom:false, amount:21},
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

  addEstimation(estimation: Estimation): Observable<Estimation>{
    const reqBody = {
      institute: estimation.institute,
      subject: estimation.subject,
      workload_hs: estimation.workload,
      estimation_time_min: estimation.estimatedTime,
      virtualization_perc:estimation.percent,
      lective_period: estimation.period,
      year: estimation.year
    }
    return this.http.post<any>(ESTIMATIONS_PATH,reqBody)
      .pipe(map((res)=>{
        estimation.id = res.id;
        estimation.dateCreation = res.creation;
        return estimation;
      }));
    //this.estimations.push(estimation);  //actualizacion del arreglo
    //this.estimations$.next(this.estimations);  // notificacion a los subcriptos
  }

  setActivities(activities: Activity[]){
    
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
      selectedMinutesActivities += (a.time_minutes * a.amount);
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
