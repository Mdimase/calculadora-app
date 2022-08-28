import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
        {id:2,name:'Lectura de unidad de un libro (30 pag)',description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:1,name:'presentacion en grupos de tp final', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:3,name:'Actividad 3', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:4,name:'Actividad 4', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:5,name:'Actividad 5', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
        {id:6,name:'Actividad 6', description:'descripcion de esta actividad la verdad que es muy buena',time:20},
        {id:7,name:'Actividad 7', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:8,name:'Actividad 9', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:9,name:'Actividad 10', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:10,name:'Actividad 11', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:11,name:'Actividad 12', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:12,name:'Actividad 13', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:13,name:'Actividad 14', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:14,name:'Actividad 15', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:15,name:'Actividad 16', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:16,name:'Actividad 17', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:17,name:'Actividad 18', description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:18,name:'Actividad 19', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:19,name:'Actividad 20', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
        {id:20,name:'Actividad 21', description:'descripcion de esta actividad la verdad que es muy buena',time:20},
        {id:21,name:'Actividad 22', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:22,name:'Actividad 23', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:23,name:'Actividad 24', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:24,name:'Actividad 25', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:25,name:'Actividad 26', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:26,name:'Actividad 27', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:27,name:'Actividad 28', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:28,name:'Actividad 29', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:29,name:'Actividad 1', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:30,name:'Actividad 2', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:31,name:'Actividad 3', description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:32,name:'Actividad 4', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:33,name:'Actividad 5', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
        {id:34,name:'Actividad 6', description:'descripcion de esta actividad la verdad que es muy buena',time:20},
        {id:35,name:'Actividad 7', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:36,name:'Actividad 9', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:37,name:'Actividad 10', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:38,name:'Actividad 11', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:39,name:'Actividad 12', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:41,name:'Actividad 14', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:40,name:'Actividad 13', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:42,name:'Actividad 15', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:43,name:'Actividad 16', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:44,name:'Actividad 17', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:45,name:'Actividad 18', description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:46,name:'Actividad 19', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:47,name:'Actividad 20', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
        {id:48,name:'Actividad 21', description:'descripcion de esta actividad la verdad que es muy buena',time:20},
        {id:49,name:'Actividad 22', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:50,name:'Actividad 23', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:51,name:'Actividad 24', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:52,name:'Actividad 25', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:53,name:'Actividad 26', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:54,name:'Actividad 27', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:55,name:'Actividad 28', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:56,name:'Actividad 29', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
      ];

      //peticion http + actualizacion de this.actividades
      this.activitiesStandar$.next(this.activitiesStandar);
    }
    return this.activitiesStandar$.asObservable();
  }

  getActivitiesCustom$(): Observable<Activity[]>{

    if(this.activitiesCustom.length === 0){
      this.activitiesCustom = [
        {id:1,name:'Actividad 1', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:2,name:'Actividad 2', description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:3,name:'Actividad 3', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:4,name:'Actividad 4', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:5,name:'Actividad 5', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
        {id:6,name:'Actividad 6', description:'descripcion de esta actividad la verdad que es muy buena',time:20},
        {id:7,name:'Actividad 7', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:8,name:'Actividad 9', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:9,name:'Actividad 10', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:10,name:'Actividad 11', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:11,name:'Actividad 12', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:12,name:'Actividad 13', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:13,name:'Actividad 14', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:14,name:'Actividad 15', description:'descripcion de esta actividad la verdad que es muy buena',time:40},
        {id:15,name:'Actividad 16', description:'descripcion de esta actividad la verdad que es muy buena',time:45},
        {id:16,name:'Actividad 17', description:'descripcion de esta actividad la verdad que es muy buena',time:50},
        {id:17,name:'Actividad 18', description:'descripcion de esta actividad la verdad que es muy buena',time:25},
        {id:18,name:'Actividad 19', description:'descripcion de esta actividad la verdad que es muy buena',time:15},
        {id:19,name:'Actividad 20', description:'descripcion de esta actividad la verdad que es muy buena',time:30},
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
    if(act1.id === act2.id && act1.name === act2.name && act1.time === act2.time && act1.description=== act2.description){
      return true;
    }
    return false;
  }

}
