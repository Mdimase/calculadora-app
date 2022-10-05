import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { UserDetails } from '../interfaces/userDetails';

const TOKEN = 'apiKey';
const SECRET_KEY = 'Secrect Key for encryption of calculadora-app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static readonly REGISTER_PATH = environment.API_URL + 'user/register';
  static readonly USERNAME_PATH = environment.API_URL + 'user/getDetails';
  static readonly RESET_PATH = environment.API_URL + 'user/reset';
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

  getUsernameLogged(email: string): Observable<UserDetails>{
    return this.http.post<any>(AuthService.USERNAME_PATH + '?email=' + email, { observe: 'response' })
      .pipe(map((details: UserDetails)=>{
        const usernameLogged: string = details.username;
        const usernameEncrypt = CryptoJS.AES.encrypt(usernameLogged, SECRET_KEY);
        localStorage.setItem('username',usernameEncrypt);
        return details;
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
          localStorage.setItem('email',emailEncrypt);
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
        return res;
      }));
  }

  logout(){
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem(TOKEN);
  }

  register(email: string, username: string, password: string): Observable<any>{
    return this.http.post<any>(AuthService.REGISTER_PATH, {email,username,password})
      .pipe(map((res)=>{
        localStorage.removeItem('rememberEmail');
        localStorage.removeItem('rememberPassword');
        return res;
      }));
  }

  reset(email: string): Observable<any>{
    return this.http.post<any>(AuthService.RESET_PATH + '?email=' + email,{});
  }

  private decrypt(encryptText: string){
    return CryptoJS.AES.decrypt(encryptText,SECRET_KEY).toString(CryptoJS.enc.Utf8);
  }

}
