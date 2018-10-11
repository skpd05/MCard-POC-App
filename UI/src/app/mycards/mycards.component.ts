import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { DataServiceService } from '../sharedServices/data-service.service';
import { CreditCardGridTransformer } from '../pipe/credit-card-grid-transform';

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
    showSpinner : boolean = false;
    columnDefs = [
        {headerName: 'Card Number', field: 'credicardnumber',cellRendererFramework :CreditCardGridTransformer },
        {headerName: 'Card Type', field: 'cardType'},
        {headerName: 'Bank Product Code', field: 'bankProductcode' },
        {headerName: 'Program', field: 'programID', width: 138},
        {headerName: 'Total Points', field: 'pointsTotal' },
        {headerName: 'Account Status',  valueGetter: function() {return 'Active';} }
        
    ];
    
    constructor(  private route: ActivatedRoute,
         private userService: UserService, 
         public enrolmentService : EnrolmentService,
         public dataService : DataServiceService){}
    async ngOnInit(){
        this.showSpinner = true;
        this.cardNo = await this.userService.getCardNo();
        await this.enrolmentService.getAccount(this.cardNo).then((data: any)=> {
            this.cardDetailsList = data.creditcardsList;
            this.temp_card_item = this.cardDetailsList.slice();
            this.showSpinner = false;
        });
        this.showSpinner = true;
        this.sub = this.route.paramMap.subscribe((params: any) => {
            this.update_filter(this.filter_by_card)
            this.showSpinner = false;     
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