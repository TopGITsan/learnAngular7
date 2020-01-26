import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private router: Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(tap(
      (event: any) => {
        console.log('Logging interceptor event: ', event);
        if (event instanceof HttpErrorResponse){
          console.log('req url :: ' + req.url);
          if (event.status === 401) {
            this.router.navigate(['/']);
          }
        }
      }
    ));
  }
}