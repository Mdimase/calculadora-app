import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor {

  constructor(private authService: AuthService, private router:Router) {}

  /* interceptor que evalua los response, en caso de encontrar errores los trata
     verifica errores de autorizacion como 401 y 403
                      recurso no encontrado como 404
     se puede agregar mas errores en el futuro facilmente
  */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(  
      catchError((e) => {
        if(e.status === 401 || e.status === 403){  //unauthorized
          this.authService.logout();
        }
        if(e.status === 404){
          // error 404
        }
        if(e.status === 400){
          // error 400
        } 
        const error = new Error(e.message);
        console.log("interceptor => " + error);
        return throwError(()=>error);
      })
    )
  }

}
