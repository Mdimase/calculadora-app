import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
        this.activitiesCustom = this.activitiesCustom.filter((a) => a.id !== activity.id);  //actualizo el arreglo cache
        this.activitiesCustom$.next(this.activitiesCustom);
      }
    });
  }

  // agregar una actividad
  addActivity(activity: Activity): void{
    const reqBody = {
      name: activity.name,
      description: activity.description,
      timeMinutes: activity.timeMinutes
    };
    this.http.post<Activity>(ACTIVITIES_PATH,reqBody).subscribe({
      next: (res: Activity) =>{
        this.activitiesCustom.push(res);  //actualizacion del arreglo cache
        this.activitiesCustom$.next(this.activitiesCustom);  // notificacion a los subcriptos
      }
    });
  }

  // editar una actividad 
  editActivity(id: number, modifiedActivity: Activity): void{
    const reqBody = {
      name: modifiedActivity.name,
      description: modifiedActivity.description,
      timeMinutes: modifiedActivity.timeMinutes  // timeMinutes
    };
    this.http.put<any>(ACTIVITIES_PATH + '/' + id,reqBody).subscribe({
      next:() =>{
        this.activitiesCustom.some(a => {
          if(a.id === id){
            a.name = modifiedActivity.name;
            a.timeMinutes = modifiedActivity.timeMinutes;
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
    if(act1.id === act2.id && act1.name === act2.name && act1.timeMinutes === act2.timeMinutes && act1.description=== act2.description && act1.custom === act2.custom && act1.amount === act2.amount){
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


  // map de letra del alfabeto + un arreglo con todas las actividades que comienzan con esa letra
  // lista de objetos de 2 campos -> letra del alfabeto y todas las activididades que inician con esa letra
  // [{letterA, [{activity1, activity2, etc}]}, {letterB, [{activity1, activity2, etc}]} ]
  initAlphabeticalMap(activities: Activity[]){
    const alphabeticalMap = [];
    let last: string = null;
    activities.forEach((a)=>{
      const activity = a;
      if(!last || last.toLowerCase() !== activity.name[0].toLowerCase()){
        last = activity.name[0];
        alphabeticalMap.push({letter: last, activities:[]});
      }
      alphabeticalMap[alphabeticalMap.length - 1].activities.push(activity);
    });
    return alphabeticalMap;
  }


}
