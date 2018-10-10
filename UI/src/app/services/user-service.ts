import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    cardno : any;
    customerDetails : any;
    cardNo: any;
    creditCardList: any;
    username: string;
    totalBalance = 0 ;
    hasLoggedIn(): boolean {
        if(localStorage.getItem('hasLoggedIn')){
            return true;
        }else{
            return false;
        }
      }
    loginUser(){
        localStorage.setItem('hasLoggedIn' , 'True');
    }  
    logoutUser(){
        localStorage.clear();
    }
    setCardNo(cardno){
        localStorage.setItem('cardno' , cardno);
    }
    async getCardNo(){
        return await localStorage.getItem('cardno');
    } 

    setCustomerDetails(data){  
        this.customerDetails = data;      
        localStorage.setItem('user', data);
    }
    getCustmerDetails(){
        return this.customerDetails;
    }
}