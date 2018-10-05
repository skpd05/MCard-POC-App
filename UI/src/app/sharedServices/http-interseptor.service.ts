import { Injectable } from '@angular/core';

import { Observable, throwError  } from 'rxjs'

import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpInterseptorService implements HttpInterceptor  {

  constructor(private toastr: ToastrService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone();

    return next.handle(request)
    .pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 0) {
          console.log('Check Your Internet Connection And Try again Later');
        } else if (err instanceof HttpErrorResponse && err.status === 401) {
          // auth.setToken(null);
          // this.router.navigate(['/', 'login']);
        }else{
          //this.toastr.error('Something went wrong please check your data or please try after sometime');
        }
         this.toastr.error('Something went wrong please check your data or please try after sometime');
     
        return throwError(err);
      })
    );
  }
}
