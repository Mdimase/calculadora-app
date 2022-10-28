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
const ESTIMATIONS_SET_ACTIVITIES_PATH = environment.API_URL + 'estimations/setActivity';

@Injectable({
  providedIn: 'root'
})
export class EstimationService {

  pipe = new DatePipe('en-US');
  private estimations: Estimation[] = [];
  private estimations$: BehaviorSubject<Estimation[]> = new BehaviorSubject<Estimation[]>(this.estimations);

  constructor(private http: HttpClient){}

  getEstimations$(): Observable<Estimation[]>{
    return this.estimations$.asObservable();
  }

  getEstimations(){
    if(this.estimations.length === 0){
      this.http.get<{data:Estimation[]}>(ESTIMATIONS_PATH).subscribe({
        next:(res)=>{
          res.data.map((e)=>{
            this.estimations.push(e);
          });
          this.estimations$.next(this.estimations);
        }
      });
    }
  }

  addEstimation(estimation: Estimation): Observable<Estimation>{
    const reqBody = {
      institute: estimation.institute,
      subject: estimation.subject,
      workloadHs: estimation.workloadHs,
      estimatedTime: estimation.estimatedTime,
      virtualizationPercent: estimation.virtualizationPercent,
      period: estimation.period,
      year: estimation.year
    }
    return this.http.post<Estimation>(ESTIMATIONS_PATH,reqBody)
      .pipe(map((res: Estimation)=>{
        estimation.id = res.id;
        estimation.creation = res.creation;
        return estimation;
      }));
  }

  setActivities(estimation: Estimation){
    estimation.activities.map((a)=>{
      const reqBody = {
        estimationId: estimation.id,
        activityId: a.id,
        amount: a.amount
      };
      this.http.post<any>(ESTIMATIONS_SET_ACTIVITIES_PATH,reqBody).subscribe({
        next: ()=>{
          if(reqBody.activityId === estimation.activities[estimation.activities.length-1].id){  //ultimo 
            this.estimations.push(estimation);  //actualizacion del arreglo
            this.estimations$.next(this.estimations);  // notificacion a los subcriptos
          }
        }
      });
    });
  }

  deleteEstimation(estimation: Estimation){
    this.http.delete<any>(ESTIMATIONS_PATH + '/' + estimation.id).subscribe({
      next:()=>{
        this.estimations = this.estimations.filter((e)=>e.id !== estimation.id);  // elimino de la cache
        this.estimations$.next(this.estimations);
      }
    });
  }

  /* equivalente en minutos de horas */
  toMinutes(hours: number): number{
    return hours*60;
  }

  /* devuelve el valor del porcentaje sobre el valor ingresado */
  valueOfPercent(value: number, percent: number): number{
    return (percent*value)/100;
  }

  // sumatoria de la carga horaria de las actividades seleccionadas en minutos
  getMinutesSelected(activities: Activity[]): number{
    let selectedMinutesActivities = 0;  
    activities.map(a =>{
      selectedMinutesActivities += (a.timeMinutes * a.amount);
    });
    return selectedMinutesActivities;
  }

  // retorna las actividades de una estimacion
  getActivities(idEstimation: number): Activity[]{
    let activities: Activity[];
    this.estimations.map((e: Estimation)=>{
      if(e.id === idEstimation){
        activities = e.activities;
      }
    });
    return activities;
  }

}
