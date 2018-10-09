import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';

import { Headers,  } from '@angular/http';

import {RequestOptions, Request, RequestMethod} from '@angular/http';

import { Observable, throwError  } from 'rxjs';

import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class EnrolmentService {

  apiURL : any = "https://enrollment.apps.dev.pcf-aws.com/api/v1/";
  validateCard : any =  this.apiURL + "loyalty/enroll/validateCard";
  checkUserIDUrl : any = this.apiURL + "loyalty/enroll/checkUserID" ;
  createProfileUrl : any = this.apiURL + "loyalty/enroll/createProfile";
  userLoginUrl :any = this.apiURL + "loyalty/enroll/ulogin";
 public  mypoints : any;
   constructor(private http: HttpClient) {

      

   }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }



getvalidateCard  (data): Observable<any> {


        return this.http.post(this.validateCard,
            data,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
                .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
                .set('Accept', 'application/json'),
                 withCredentials: true
            }
          )
        .pipe(   
        catchError(this.handleError) // then handle the error
       );
   	   // let headers = new Headers({ 'Content-Type': 'application/json' , 'uuid' : 'f04c5720-c3ac-11e8-a355-529269fb1459' , 'client_id' : 'f04c5edc-c3ac-11e8-a355-529269fb1459' , 'Accept' : 'application/json' });
        //let options = new RequestOptions({ headers: headers });
       // return this.http.post(this.validateCard, data, options )
    }


   checkUserID  (data): Observable<any> {
   

        return this.http.get(this.checkUserIDUrl+"/userId="+data ,  {responseType: 'text'})
        

        //let options = new RequestOptions({ headers: headers });
        //return this.http.get(this.checkUserIDUrl+"?userId="+data)
    }

    createProfile  (data): Observable<any> {
   	let headers = new Headers({ 'Content-Type': 'application/json' });

       return this.http.post(this.createProfileUrl,
            data,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
                .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
                .set('Accept', 'application/json'),
                 withCredentials: true
            }
          )
        .pipe(
        catchError(this.handleError) // then handle the error
       );

        //let options = new RequestOptions({ headers: headers });
        //return this.http.post(this.createProfileUrl , data)
    }

    userLogin  (data): Observable<any> {
   	let headers = new Headers({ 'Content-Type': 'application/json' });

        return this.http.post(this.userLoginUrl,
            data,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
                .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
                .set('Accept', 'application/json'),
                 withCredentials: true
            }
          )
        .pipe(
         catchError(this.handleError) // then handle the error
       );

    }
    async getAccount(cardno) {
      // let url = this.accountUrl + cardno +'/accountsummary'
      const url = await "https://customer.apps.dev.pcf-aws.com/api/v1/creditcard/customer/"+ cardno + "/accountsummary";
      const response = await this.http.get(url,
            {
              headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
                .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
                .set('Accept', 'application/json'),
                 withCredentials: true
            }
          )
        .pipe(
        catchError(this.handleError) // then handle the error
       ).toPromise();

       return response;
    }
  async getMyPoints(cardno){    
    let url = await "https://redemption.apps.dev.pcf-aws.com/api/v1/loyalty/redemption/historybycard/"+ cardno ;
    const response = await this.http.get(url,
          {
            headers: new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
              .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
              .set('Accept', 'application/json'),
               withCredentials: true
          }
        ).toPromise();
        
        this.mypoints= await response;
      return response;
  }


}
