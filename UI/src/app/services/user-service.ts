import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class UserService {
    cardno : any;
    customerDetails : any;
    cardNo: any;
    creditCardList: any;
    username: string;
    totalBalance = 0 ;
    public hasLoggedIn(): boolean {
        if(localStorage.getItem('hasLoggedIn')){
            return true;
        }else{
            return false;
        }
      }
    public loginUser(): void{
        localStorage.setItem('hasLoggedIn' , 'True');
    }  
    public logoutUser():void{
        localStorage.clear();
    }
    setCardNo(cardno){
        localStorage.setItem('cardno' , cardno);
    }
    getCardNo(){
        return localStorage.getItem('cardno');
    } 

    public setCustomerDetails(data){  
        this.customerDetails = data;      
        localStorage.setItem('user', data);
    }
    getCustmerDetails(){
        return this.customerDetails;
    }
}