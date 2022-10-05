import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from './toast.service';

const TOKEN = 'apiKey';
const SECRET_KEY = 'Secrect Key for encryption of calculadora-app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly REGISTER_PATH = environment.API_URL + 'user/register';
  static readonly USERNAME_PATH = environment.API_URL + 'user/getUsername';
  static readonly LOGIN_PATH = environment.API_URL + 'login';

  /* con back implementado no va a existir una lista de usuarios en memoria */
  /* al loguearse el back retornara el username, email y token */

  constructor(private http: HttpClient){}

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

  getUsernameLogged(email: string): Observable<string>{
    return this.http.post<any>(AuthService.USERNAME_PATH + '?email=' + email,{observe:'response'})
      .pipe(map((res: any)=>{
        return res.username;
      }));
  }

  login(email: string, password: string, remember: boolean ): Observable<any>{
    return this.http.post<any>(AuthService.LOGIN_PATH, {email,password},{observe:'response'})
      .pipe(map((res:any) => { //mapea la respuesta http a la variable res
        const token = res.headers.get("Authorization");  
        // logueo exitoso
        if(token){
          localStorage.setItem(TOKEN,token);
          const emailEncrypt = CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
          this.getUsernameLogged(email).subscribe({
            next: (email: string)=>{
              const usernameLogged: string = email;
              const usernameEncrypt = CryptoJS.AES.encrypt(usernameLogged, SECRET_KEY);
              localStorage.setItem('email',emailEncrypt);
              localStorage.setItem('username',usernameEncrypt);
              if(remember){
                const passwordEncrypt = CryptoJS.AES.encrypt(password, SECRET_KEY);
                localStorage.setItem('rememberEmail',emailEncrypt);
                localStorage.setItem('rememberPassword',passwordEncrypt);
              }
              else{
                localStorage.removeItem('rememberEmail');
                localStorage.removeItem('rememberPassword');
              }
            }
          });
        }
        return res;
      }));
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem(TOKEN);
  }

  // IMPORTANTE: manejar error de email duplicado
  register(email: string, username: string, password: string): Observable<void>{
    // post al backend
    return this.http.post<void>(AuthService.REGISTER_PATH, {email,username,password});
    /*
    // simulacion de registro de usuario
    if(this.users.filter(u=>u.email === email).length > 0){
      console.log('email duplicado');
    }
    else{
      this.users.push({username,email,password});
    }
    */
    
  }

  private decrypt(encryptText: string){
    return CryptoJS.AES.decrypt(encryptText,SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

}
