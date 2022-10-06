import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpResponse } from '@capacitor/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor {

  constructor(private authService: AuthService,
              private router: Router,
              private toastService: ToastService) {}

  /* interceptor que evalua los response, en caso de encontrar errores los trata
     verifica errores de autorizacion como 401 y 403
                      recurso no encontrado como 404
     se puede agregar mas errores en el futuro facilmente
  */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((e) => {
        /*
        if(e.status === 401 || e.status === 403){  //unauthorized
          console.log('unauthorized');
          this.authService.logout();
        }
        if(e.status === 404){
          // error 404
        }
        if(e.status === 400){
          // error 400
        }*/
        if(e.status === 0){  //server down
          console.log('lost server connection');
          this.toastService.showErrorMessage('Conexion con servidor perdida. Verifique su conexion e intente nuevamente');
        }
        const error = new Error(e.message);
        console.log('interceptor => ' + error);
        return throwError(e);
      })
    );
  }

}
