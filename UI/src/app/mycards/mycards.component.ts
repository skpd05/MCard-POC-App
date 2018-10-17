import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { DataServiceService } from '../sharedServices/data-service.service';
import { CreditCardGridTransformer } from '../pipe/credit-card-grid-transform';
import { TransactionService } from '../services/transaction.service';
import { DateGridTransformer } from '../pipe/date-grid-transform';

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
    transactionHistory = [];
    transactionAmout = "";
    transactionError = "";
    columnDefs = [
        {headerName: 'Card Number', field: 'credicardnumber',cellRendererFramework :CreditCardGridTransformer },
        {headerName: 'Card Type', field: 'cardType'},
        {headerName: 'Bank Product Code', field: 'bankProductcode' },
        {headerName: 'Program', field: 'programID', width: 138},
        {headerName: 'Balance Points', field: 'pointsTotal' },
        {headerName: 'Account Status',  valueGetter: function() {return 'Active';} }
        
    ];

    transColumnDefs = [
        {headerName: 'Card Number', field: 'accountnumber',cellRendererFramework :CreditCardGridTransformer , width: 180},
        {headerName: 'Transaction Amount', field: 'transactionamount', width: 150},
        {headerName: 'Currency', field: 'currencycode', width: 150 },
        {headerName: 'Points Collected', field: 'pointscaluclated', width: 150},
        {headerName: 'Description', field: 'transcationtype', width: 148},
        {headerName: 'Merchant Name', field: 'merchantname', width: 150 },
        {headerName: 'Trasaction Date', field:"created_at", cellRendererFramework : DateGridTransformer,sort: ['desc']}
        
    ];
    
    constructor(  private route: ActivatedRoute,
         private userService: UserService, 
         public enrolmentService : EnrolmentService,
         public dataService : DataServiceService,
         private _transactionService: TransactionService){}
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
        this.showSpinner = true;
        await this._transactionService.getTransactionsHistory().then((data: any)=> {
            this.showSpinner = false;
            this.transactionHistory = data;
        });
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

    async simulateTransaction(){
        if (this.filter_by_card == "all_cards" && ( this.transactionAmout=="" || this.transactionAmout=="0")) {
            this.transactionError = "Please select card and enter amount.";
            //this._transactionService.makeTransactionSimulation(this.filter_by_card,this.transactionAmout);
        }else if(this.filter_by_card == "all_cards" && this.transactionAmout!=""){
            this.transactionError = "Please select card.";
        }
        else if(this.filter_by_card != "all_cards" && ( this.transactionAmout=="" || this.transactionAmout=="0")){
            this.transactionError = "Please enter amount more than 0.";
        }else{
            this.transactionError = "";
            this.showSpinner = true;
            await this._transactionService.makeTransactionSimulation(this.filter_by_card,this.transactionAmout);
            await this._transactionService.getTransactionsHistory().then((data: any)=> {
                this.showSpinner = false;
                this.transactionHistory = data;
            });
        }
    }

    onlyNumberKey(event) {
        // Allow to enter only numbers (0-9) in text filed
        return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
      }
   

}
