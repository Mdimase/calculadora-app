import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import * as CryptoJS from 'crypto-js';

const TOKEN = 'apiKey';
const SECRET_KEY = 'Secrect Key for encryption of calculadora-app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: User[] = [
    { username:'mdimase21', email:'mdimase@gmail.com', password:'123456789'},
    { username:'admin', email:'admin@gmail.com', password:'123456789'},
    { username:'vhboscoscuro', email:'vhboscoscuro@gmail.com', password:'123456789'}
  ];

  /* con back implementado no va a existir una lista de usuarios en memoria */
  /* al loguearse el back retornara el username, email y token */

  constructor(){}

  get token(){
    return localStorage.getItem(TOKEN);
  }

  getEmail(){
    const emailEncrypt = localStorage.getItem('email');
    return this.decrypt(emailEncrypt);
  }

  getUsername(){
    const usernameEncrypt = localStorage.getItem('username');
    return this.decrypt(usernameEncrypt);
  }

  getRememberEmail(){
    if(localStorage.getItem('rememberEmail')){
      const rememberEmailEncrypt = localStorage.getItem('rememberEmail');
      return this.decrypt(rememberEmailEncrypt);
    }
    return '';
  }

  getRememberPassword(){
    if(localStorage.getItem('rememberPassword')){
      const rememberPasswordEncrypt = localStorage.getItem('rememberPassword');
      return this.decrypt(rememberPasswordEncrypt);
    }
    return '';
  }

  // IMPORTANTE: reescribir con backend echo, enviar email y password, manejar la respuesta (exito fracaso)
  login(email: string, password: string, remember: boolean ): boolean{
    // post al backend
    // cambiar retorno a observable con res o error
    //simulacion de verificacion de logueo
    const userLogged = this.users.filter(u =>u.email === email && u.password === password);
    if(userLogged.length > 0){ //logueo exitoso
      const emailEncrypt = CryptoJS.AES.encrypt(userLogged[0].email.trim(), SECRET_KEY).toString();
      const usernameEncrypt = CryptoJS.AES.encrypt(userLogged[0].username, SECRET_KEY);
      localStorage.setItem('email',emailEncrypt);
      localStorage.setItem('username',usernameEncrypt);
      if(remember){
        const passwordEncrypt = CryptoJS.AES.encrypt(userLogged[0].password, SECRET_KEY);
        localStorage.setItem('rememberEmail',emailEncrypt);
        localStorage.setItem('rememberPassword',passwordEncrypt);
      }
      else{
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
      }
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

  private decrypt(encryptText: string){
    return CryptoJS.AES.decrypt(encryptText,SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

}
