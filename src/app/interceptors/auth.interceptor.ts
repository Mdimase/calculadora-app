import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService){}

  /*metodo intercept para agregar JWT token en el headers de las request*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if(this.authService.token != null){  // existe token
      request = request.clone({
        headers: request.headers.set('Authorization',this.authService.token),
      });
    }
    return next.handle(request);
  }

}
