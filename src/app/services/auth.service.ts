import { Injectable } from '@angular/core';
import { User } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    { username:'mdimase21', email:'mdimase@gmail.com', password:'123456789'},
    { username:'admin', email:'admin@gmail.com', password:'123456789'},
    { username:'vhboscoscuro', email:'vhboscoscuro@gmail.com', password:'123456789'}
  ];

  private readonly TOKEN = 'apiKey';

  /* con back implementado no va a existir una lista de usuarios en memoria */
  /* al loguearse el back retornara el username, email y token */

  constructor(){}

  get token(){
    return localStorage.getItem(this.TOKEN);
  }

  getEmail(){
    return localStorage.getItem('email');
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  // IMPORTANTE: reescribir con backend echo, enviar email y password, manejar la respuesta (exito fracaso)
  login(email: string, password: string ): boolean{
    // post al backend
    // cambiar retorno a observable con res o error
    //simulacion de verificacion de logueo
    const userLogged = this.users.filter(u =>u.email === email && u.password === password);
    if(userLogged.length > 0){ //logueo exitoso
      localStorage.setItem('email',userLogged[0].email);
      localStorage.setItem('username',userLogged[0].username);
      /*
      const token = res.headers.get('Authorization');
      if(token){
        // setear todos los localStorage
      }
      //localStorage.setItem(this.TOKEN,token);
      return res; */
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('username');
  }

  // IMPORTANTE: manejar error de email duplicado
  register(email: string, username: string, password: string){
    // post al backend
    // simulacion de registro de usuario
    if(this.users.filter(u=>u.email === email).length > 0){
      console.log('email duplicado');
    }
    else{
      this.users.push({username,email,password});
    }
  }

}
