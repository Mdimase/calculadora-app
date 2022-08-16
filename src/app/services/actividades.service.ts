import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Actividad } from '../interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  /* IMPORTANTE: seperar las actividades custom de las standar*/

  private actividades: Actividad[] = [
    {id:1,nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {id:2,nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {id:3,nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {id:4,nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {id:5,nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {id:6,nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {id:7,nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:8,nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:9,nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:10,nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:11,nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:12,nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:13,nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:14,nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:15,nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {id:16,nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {id:17,nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {id:18,nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {id:19,nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {id:20,nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {id:21,nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:22,nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:23,nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:24,nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:25,nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:26,nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:27,nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:28,nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:29,nombre:'Actividad 1', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {id:30,nombre:'Actividad 2', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {id:31,nombre:'Actividad 3', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {id:32,nombre:'Actividad 4', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {id:33,nombre:'Actividad 5', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {id:34,nombre:'Actividad 6', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {id:35,nombre:'Actividad 7', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:36,nombre:'Actividad 9', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:37,nombre:'Actividad 10', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:38,nombre:'Actividad 11', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:39,nombre:'Actividad 12', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:40,nombre:'Actividad 13', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:41,nombre:'Actividad 14', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:42,nombre:'Actividad 15', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:43,nombre:'Actividad 16', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:45},
    {id:44,nombre:'Actividad 17', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:50},
    {id:45,nombre:'Actividad 18', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:25},
    {id:46,nombre:'Actividad 19', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:15},
    {id:47,nombre:'Actividad 20', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:30},
    {id:48,nombre:'Actividad 21', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:20},
    {id:49,nombre:'Actividad 22', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:50,nombre:'Actividad 23', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:51,nombre:'Actividad 24', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:52,nombre:'Actividad 25', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:53,nombre:'Actividad 26', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:54,nombre:'Actividad 27', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:55,nombre:'Actividad 28', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
    {id:56,nombre:'Actividad 29', descripcion:'descripcion de esta actividad la verdad que es muy buena',tiempo:40},
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
    this.actividades = this.actividades.filter((a) => a.id !== actividad.id);
    this.actividades$.next(this.actividades);
  }

  /* agregar una actividad */
  // IMPORTANTE: al enviar al back, quitar el id simulado
  agregarActividad(actividad: Actividad){
    actividad.id = this.actividades[this.actividades.length - 1].id + 1;  // simular creacion del id
    console.log(actividad);
    this.actividades.push(actividad);  //actualizacion del arreglo
    this.actividades$.next(this.actividades);  // notificacion a los subcriptos
  }

  /* editar una actividad */
  editarActividad(id: number, actividadActualizada: Actividad){
    this.actividades.map(a => {
      if (a.id === id){
        a.nombre = actividadActualizada.nombre;
        a.tiempo = actividadActualizada.tiempo;
        a.descripcion = actividadActualizada.descripcion;
      }
    });
    this.actividades$.next(this.actividades);
  }

}
