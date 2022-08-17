import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* con back implementado no va a existir una lista de usuarios en memoria */
  /* al loguearse el back retornara el username, email y token */

  usuarios: Usuario[] = [
    { username:'mdimase21', email:'mdimase@gmail.com', password:'123456789'},
    { username:'admin', email:'admin@gmail.com', password:'123456789'},
    { username:'vhboscoscuro', email:'vhboscoscuro@gmail.com', password:'123456789'}
  ];

  constructor(){}
}
