import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnrolmentService } from './enrolment.service';

@Injectable()
export class DataServiceService {
  userData:any;
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  public creditCardList: any = [];
  public username: string = "";
  public totalBalance = 0 ;
  public cartTotalItem = 0;

  constructor(public enrolmentService: EnrolmentService) { }

  changeMessage(message: string) {
    this.messageSource.next(message)
  }

  async setUserInfo(data){
    
     this.getCardList(data.creditcardsList);
      this.getBalancePoint(data.creditcardsList);
      this.username = data.firstName;
      this.changeMessage(this.username);
  }

  
  getCardList(list): any  {
    this.creditCardList = [];
    list.forEach(element => {
      this.creditCardList.push(element.credicardnumber);
    });
  }

  clearData(){
    this.username = null;
    this.creditCardList = [];
    this.totalBalance = 0;
  }

  getBalancePoint(list): any {
    this.totalBalance = 0;
    list.forEach(element => {
      this.totalBalance += Math.round(element.pointsTotal);
    });
  }

  

}