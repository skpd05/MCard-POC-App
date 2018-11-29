import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { CheckoutserviceService } from './checkoutservice.service';
import { DataServiceService } from '../sharedServices/data-service.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, private _checkoutService: CheckoutserviceService,
    private dataService: DataServiceService) { }

  trasactionApiUrl = environment.transaction_api+"/api/v1/simulate/card";

  async getTransactionsHistory() {
    const data = this.dataService.creditCardList;

    const output = await this.http.post(this.trasactionApiUrl + "/transactions",
      data,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
          .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
          .set('Accept', 'application/json'),
        withCredentials: true
      }
    ).toPromise();
    return output;
  }

  async makeTransactionSimulation(creditCardNumber, amount) {
    if (creditCardNumber != "all_cards") {
      const data = ({
        'city': 'NewYork',
        'creditCardNumber': creditCardNumber,
        'merchantid': '1234',
        'merchantname': 'Mastercard',
        'state': 'Philedelhpia',
        'transactionTimestamp': '1419038000',
        'transactionamount': amount,
        'transcationtype': 'add'
      });
      const output = await this.http.post(this.trasactionApiUrl + "/savetransaction",
        data,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
            .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
            .set('Accept', 'application/json'),
          withCredentials: true
        }
      ).toPromise();
      return output;
    }
  }
  
}
