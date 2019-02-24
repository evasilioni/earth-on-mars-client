import { Observable } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (localStorage.getItem("token") != null){
        request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
    }
    return next.handle(request);
  }
}