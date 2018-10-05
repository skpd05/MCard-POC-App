import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from '../sharedServices/enrolment.service';

@Component({
    selector: 'mycards-component',
    templateUrl: './mycards.component.html',
    styleUrls: ['./mycards.component.css']
})

export class MyCardsComponent{
    points: number = 9000;
    itemsInCart : number = 0;
    itemsInWishList : number = 0;
    filter_by_card: string = 'all_cards';
    sub: any;
    cardNo: any;
    cardDetailsList: any = [];
    temp_card_item: any = [];
    columnDefs = [
        {headerName: 'Credit Card Number', field: 'credicardnumber' },
        {headerName: 'Card Type', field: 'cardType'},
        {headerName: 'Bank Product Code', field: 'bankProductcode' },
        {headerName: 'Program ID', field: 'programID'},
        {headerName: 'Total Points', field: 'pointsTotal' },
        {headerName: 'Account Status ID', field: 'accountStatusID' }
        
    ];
    
    constructor(  private route: ActivatedRoute, private userService: UserService, public enrolmentService : EnrolmentService){}
    ngOnInit(){
        this.cardNo = this.userService.getCardNo();
        this.enrolmentService.getAccount(this.cardNo).subscribe((data: any)=> {
            console.log(data); 
            this.cardDetailsList = data.creditcardsList;
            this.temp_card_item = this.cardDetailsList.slice();
        })
        this.sub = this.route.paramMap.subscribe((params: any) => {
            console.log(params.params.params);
            this.filter_by_card = params.params.params;
            this.update_filter(params.params.params)
        })        
    }
        
    update_filter(x){
        this.temp_card_item = [];
        if(x == 'all_cards'){
            this.temp_card_item = this.cardDetailsList.slice();
        }else{        
            this.cardDetailsList.forEach(item =>{
                if(item.credicardnumber == x){
                    this.temp_card_item.push(item);
                }
            })
    }
}
   

}