import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actividad } from '../interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  /* IMPORTANTE: seperar las actividades custom de las standar*/

  private actividades: Actividad[] = [
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

  private actividades$: BehaviorSubject<Actividad[]> = new BehaviorSubject<Actividad[]>(this.actividades);

  constructor(){}

  getActividades$(): Observable<Actividad[]>{
    return this.actividades$.asObservable();
  }

  setActividades$(data: Actividad[]){
    this.actividades$.next(data);
  }

  /* borrar una actividad */
  borrarActividad(actividad: Actividad){
    this.actividades = this.actividades.filter((a) => a.nombre !== actividad.nombre);
    this.actividades$.next(this.actividades);
  }

  /* agregar una actividad */
  agregarActividad(actividad: Actividad){
    this.actividades.push(actividad);  //actualizacion del arreglo
    this.actividades$.next(this.actividades);  // notificacion a los subcriptos
  }

  /* editar una actividad */
  /* TO DO: reemplazar nombre por id */
  editarActividad(id: string, actividadActualizada: Actividad){
    this.actividades.map(a => {
      if (a.nombre === id) {
        a.nombre = actividadActualizada.nombre;
        a.tiempo = actividadActualizada.tiempo;
        a.descripcion = actividadActualizada.descripcion;
      }
    });
    this.actividades$.next(this.actividades);
  }

}
