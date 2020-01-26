import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    console.log('Intercepted http request: ', req);
    const token = this.authService.getToken();
    const param = req.params.set('auth', token);

    // const copiedReq = req.clone({headers: req.headers.set('','')});
    const copiedReq = req.clone({params: param});

    return next.handle(copiedReq);
  }
}