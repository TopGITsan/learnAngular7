import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(name: string, profileImage: File){
    const formData: any = new FormData();
    formData.append('name', name);
    formData.append('avatar', profileImage);

    const url = 'https://top-ng-recipebook.firebaseio.com/upload.json';
    return this.httpClient.post(url, formData, {reportProgress: true, observe: 'events'})
      .pipe(catchError(this.errMgmt));
  }

  errMgmt(err: HttpErrorResponse) {
    let errMessage = '';
    if (errMessage as any instanceof ErrorEvent) {
      // get client side error
      errMessage = err.error.message;
    } else {
      // get server side event
      errMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(errMessage);
    return throwError(errMessage);
  }

}
