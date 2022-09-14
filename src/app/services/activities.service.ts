import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Type } from '../interfaces/activity';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private activitiesStandar: Activity[] = [];
  private activitiesCustom: Activity[] = [];
  private activities: Activity[] = [];

  private activitiesStandar$: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(this.activitiesStandar);
  private activitiesCustom$: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(this.activitiesCustom);
  private activities$: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(this.activities);

  constructor(){}

  getActivitiesStandar$(): Observable<Activity[]>{
    if(this.activitiesStandar.length === 0){
      this.activitiesStandar = [
        // eslint-disable-next-line max-len
        {id:1,name:'Lectura libro (1 pag)',description:'lectura de texto en formato paginas (libros, informes, artículos de investigación, documentos, etc)',time:3, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:2,name:'Reproducción contenido audiovisual', description:'interacción con contenido multimedia (audios, podcast, videos, etc) ',time:1, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:3,name:'Intervencion en foro', description:'interacción en un foro (publicación de información, debate con compañeros, lectura de opiniones, etc)',time:20, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:4,name:'Cuestionario tiempo definido', description:'cuestionario de preguntas con un tiempo establecido manualmente',time:1, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:5,name:'Cuestionario multiple choice (1 pregunta)', description:'preguntas de opción múltiple estilo test (respuestas rápidas y concretas)',time:3, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:6,name:'Wiki colaborativa', description:'foro comunitario de trabajo grupal, con contenido editable',time:30, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:7,name:'Encuentro sincronico (meeting)', description:'clase sincrónica mediante una plataforma de meeting',time:30, type:Type.standard},
        // eslint-disable-next-line max-len
        {id:8,name:'Exposicion tematica', description:'exposición o presentación realizada por un estudiante o un grupo sobre un tema en particular',time:20, type:Type.standard},
        {id:9,name:'Actividad 9', description:'descripcion de esta actividad la verdad que es muy buena',time:40, type:Type.standard},
      ];

      //peticion http + actualizacion de this.actividades
      this.activitiesStandar$.next(this.activitiesStandar);
    }
    return this.activitiesStandar$.asObservable();
  }

  getActivitiesCustom$(): Observable<Activity[]>{

    if(this.activitiesCustom.length === 0){
      this.activitiesCustom = [
        {id:1,name:'Ejercicio TP1',description:'ejericio promedio del tp1 (simples y de adaptacion)',time:10, type:Type.custom},
        {id:2,name:'Actividad 2', description:'descripcion de esta actividad la verdad que es muy buena',time:25, type:Type.custom},
        {id:3,name:'Actividad 3', description:'descripcion de esta actividad la verdad que es muy buena',time:45, type:Type.custom},
        {id:4,name:'Actividad 4', description:'descripcion de esta actividad la verdad que es muy buena',time:15, type:Type.custom},
        {id:5,name:'Actividad 5', description:'descripcion de esta actividad la verdad que es muy buena',time:30, type:Type.custom},
      ];

      //peticion http + actualizacion de this.actividades
      this.activitiesCustom$.next(this.activitiesCustom);
    }

    return this.activitiesCustom$.asObservable();
  }

  getActivities$(): Observable<Activity[]>{
      this.getActivitiesStandar$().subscribe(activitiesStandar=>{
        this.activities = activitiesStandar;
        this.getActivitiesCustom$().subscribe(activitiesCustom =>{
          this.activities = [...this.activities, ...activitiesCustom];
          this.activities$.next(this.activities);
        });
      });
      return this.activities$.asObservable();
  }

  setActivities$(activities: Activity[]){
    this.activities = activities;
    this.activities$.next(this.activities);
  }

  /* borrar una actividad */
  deleteActivity(activity: Activity): void{
    // peticion http
    this.activitiesCustom = this.activitiesCustom.filter((a) => a.id !== activity.id);
    this.activitiesCustom$.next(this.activitiesCustom);
  }

  /* agregar una actividad */
  // IMPORTANTE: al enviar al back, quitar el id simulado
  addActivity(activity: Activity): void{
    // peticion http
    activity.id = this.activitiesCustom[this.activitiesCustom.length - 1].id + 1;  // simular creacion del id
    activity.type = Type.custom;
    this.activitiesCustom.push(activity);  //actualizacion del arreglo
    this.activitiesCustom$.next(this.activitiesCustom);  // notificacion a los subcriptos
  }

  /* editar una actividad */
  editActivity(id: number, modifiedActivity: Activity): void{
    // peticion http
    this.activitiesCustom.map(a => {
      if (a.id === id){
        a.name = modifiedActivity.name;
        a.time = modifiedActivity.time;
        a.description = modifiedActivity.description;
      }
    });
    this.activitiesCustom$.next(this.activitiesCustom);
  }

  /* actividades iguales cuando todos sus atributos tienen los mismos valores */
  equal(act1: Activity, act2: Activity): boolean{
    if(!act1 && !act2){
      return true;
    }
    // eslint-disable-next-line max-len
    if(act1.id === act2.id && act1.name === act2.name && act1.time === act2.time && act1.description=== act2.description && act1.type === act2.type){
      return true;
    }
    return false;
  }

  getIds(activities: Activity[]): number[]{
    const ids: number[] = [];
    activities.map((a)=>{
      ids.push(a.id);
    });
    return ids;
  }

}
