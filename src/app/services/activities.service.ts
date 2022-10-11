import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Activity } from '../interfaces/activity';

const ACTIVITIES_PATH = environment.API_URL + 'activities';
const ACTIVITIES_STANDARD_PATH = environment.API_URL + 'activities?type=STANDARD';
const ACTIVITIES_CUSTOM_PATH = environment.API_URL + 'activities?type=CUSTOM';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  private activitiesStandard: Activity[] = [];
  private activitiesCustom: Activity[] = [];

  private activitiesStandard$: BehaviorSubject<Activity[]> = new BehaviorSubject<Activity[]>(this.activitiesStandard);
  private activitiesCustom$: BehaviorSubject<Activity[]>= new BehaviorSubject<Activity[]>(this.activitiesCustom);

  constructor(private http: HttpClient){}

  getStandard$():Observable<Activity[]>{
    return this.activitiesStandard$.asObservable();
  }

  getActivitiesStandard(){
    if(this.activitiesStandard.length === 0){
      this.http.get<{activities: Activity[]}>(ACTIVITIES_STANDARD_PATH).subscribe({
        next:(res)=>{
          this.activitiesStandard = res.activities;
          this.activitiesStandard$.next(this.activitiesStandard);
        }
      });
    }
  }

  getCustom$():Observable<Activity[]>{
    console.log(this.activitiesCustom$.observers);
    return this.activitiesCustom$.asObservable();
  }

  getActivitiesCustom(){
    if(this.activitiesCustom.length === 0){
      this.http.get<{activities: Activity[]}>(ACTIVITIES_CUSTOM_PATH).subscribe({
        next: (res)=>{
          this.activitiesCustom = res.activities;
          this.activitiesCustom$.next(this.activitiesCustom);
        }
      });
    }
  }

  // borrar una actividad
  deleteActivity(activity: Activity): void{
    this.http.delete<any>(ACTIVITIES_PATH + '/' + activity.id).subscribe({
      next: ()=>{
        this.activitiesCustom = this.activitiesCustom.filter((a) => a.id !== activity.id);
        this.activitiesCustom$.next(this.activitiesCustom);
      }
    });
  }

  // agregar una actividad
  addActivity(activity: Activity): void{
    const reqBody = {
      name: activity.name,
      description: activity.description,
      time_minutes: activity.time_minutes
    };
    this.http.post<Activity>(ACTIVITIES_PATH,reqBody).subscribe({
      next: (res: Activity) =>{
        this.activitiesCustom.push(res);  //actualizacion del arreglo
        this.activitiesCustom$.next(this.activitiesCustom);  // notificacion a los subcriptos
      }
    });
  }

  // editar una actividad 
  editActivity(id: number, modifiedActivity: Activity): void{
    const reqBody = {
      name: modifiedActivity.name,
      description: modifiedActivity.description,
      time_minutes: modifiedActivity.time_minutes.toString()
    };
    this.http.put<any>(ACTIVITIES_PATH + '/' + id,reqBody).subscribe({
      next:() =>{
        this.activitiesCustom.some(a => {
          if(a.id === id){
            a.name = modifiedActivity.name;
            a.time_minutes = modifiedActivity.time_minutes;
            a.description = modifiedActivity.description;
          }
        });
        this.activitiesCustom$.next(this.activitiesCustom);
      }
    });
  }

  /* actividades iguales cuando todos sus atributos tienen los mismos valores */
  equal(act1: Activity, act2: Activity): boolean{
    if(!act1 && !act2){
      return true;
    }
    // eslint-disable-next-line max-len
    if(act1.id === act2.id && act1.name === act2.name && act1.time_minutes === act2.time_minutes && act1.description=== act2.description && act1.custom === act2.custom){
      return true;
    }
    return false;
  }

  /* ordena alfabeticamente ascendente no case sensitive */
  sortAlphabetically(activities: Activity[]): void{
    activities.sort((a,b)=>{
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });
  }


}
