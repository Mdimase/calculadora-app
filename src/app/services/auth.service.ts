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

  getEmail(){
    return localStorage.getItem('email');
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  // IMPORTANTE: reescribir con backend echo, enviar email y password, manejar la respuesta (exito fracaso)
  iniciarSesion(email: string, password: string ): boolean{
    // post al backend
    //simulacion de verificacion de logueo
    const usuarioLogueado = this.usuarios.filter(u =>u.email === email && u.password === password);
    if(usuarioLogueado.length > 0){ //logueo exitoso
      localStorage.setItem('email',usuarioLogueado[0].email);
      localStorage.setItem('username',usuarioLogueado[0].username);
      return true;
    }
    return false;
  }

  cerrarSesion(){
    localStorage.removeItem('email');
    localStorage.removeItem('username');
  }

  // IMPORTANTE: manejar error de email duplicado
  registro(email: string, username: string, password: string){
    // post al backend
    // simulacion de registro de usuario
    if(this.usuarios.filter(u=>u.email === email).length > 0){
      console.log('email duplicado');
    }
    else{
      this.usuarios.push({username,email,password});
    }
  }

}
