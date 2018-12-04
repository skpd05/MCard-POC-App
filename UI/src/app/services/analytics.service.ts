import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  analytics_api : string = environment.analytics_api;

  constructor(private http: HttpClient) { }

  async analyseCustomerTransactions(customerId){    
    let url = await this.analytics_api+"/api/v1/analytics/analyzetransaction/"+customerId;
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
      return response;
  }
}
