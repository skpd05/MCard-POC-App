import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http-services';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { UserService } from 'src/app/services/user-service';
import { DataServiceService } from '../sharedServices/data-service.service';
import { CreditCardGridTransformer } from '../pipe/credit-card-grid-transform';
import { DateGridTransformer } from '../pipe/date-grid-transform';


@Component({
    selector: 'mypoints-component',
    templateUrl: './mypoints.component.html',
    styleUrls: ['./mypoints.component.css']
})

export class MyPointsComponent{
    points: number = 9000;
    itemsInCart : number = 0;
    itemsInWishList : number = 0;
    filter_by_card: string = 'all_cards';
    items: any;
    temp_item: any;
    title = 'app';
    cardNo: any;
    errorMessage: boolean = false;
    
    columnDefs = [
        {headerName: 'Date', field: 'redemptiontimestaamp',width: 200,type: ['dateColumn'],cellRendererFramework : DateGridTransformer},
        {headerName: 'Item ', field: 'redeemeditem' ,width: 350},
        {headerName: 'Reedeemed Points', field: 'redeemedpoints',width: 160},
        {headerName: 'Quantity', field: 'quantity',width: 150 },
        {headerName: 'Card Number', field: 'cardnumber', cellRendererFramework :CreditCardGridTransformer}
    ];
    rowData: any;
    cardDetailsList: any = [];
    temp_card_item: any = [];
    totalBalance = 0 ;
    showSpinner : boolean = false;
    
    constructor(private httpService : HttpService, 
                private dataService : DataServiceService,
                private enrolmentService: EnrolmentService, 
                private userService: UserService){}   
    
    async ngOnInit(){        
        // this.httpService.get('path').subscribe((data: any) => {
        //     console.log(data);
        // });
        // this.enrolmentService.checkUserID({'para_1': 'RAJ1245'}).subscribe((data: any)=> {
        //     console.log("here",data);
        // });
        this.cardNo = await this.userService.getCardNo();
       /* this.showSpinner = true;
        await this.enrolmentService.getAccount(this.cardNo).then((data: any)=> {
            this.cardDetailsList = data.creditcardsList;
            this.temp_card_item = this.cardDetailsList.slice();
            this.getBalancePoint(data.creditcardsList);
            this.showSpinner = false;
        })  */
        this.showSpinner = true;
        await this.enrolmentService.getMyPoints(this.cardNo).then((data: any)=> {                        
            if(data==undefined||data==null){
                this.items = [];     
                this.temp_item = [];
            }else{
                this.items = data;     
                this.temp_item = data;
                
            }
            this.showSpinner = false;
        }, (error: any)=>{
            //console.log(error);
            //this.errorMessage = true;
            this.showSpinner = false;
        });        
    }
        
    update_filter(x){
        this.temp_item = [];
        /*this.enrolmentService.getMyPoints(x).subscribe((data: any)=> {                        
            this.items = data 
            console.log(data); 
            if(x == 'all_cards'){
                this.rowData = (this.items).slice();
            }else{        
                this.items.forEach(item =>{
                    if(item.cardnumber == x){
                        this.rowData.push(item);
                    }
                }) 
            }
        }, (error: any)=>{
            console.log(error);
            this.errorMessage = true;
        });     
        */
        if(x == 'all_cards'){
            this.temp_item = this.items;
        }else{        
            this.items.forEach(item =>{
                if(item.cardnumber == x){
                    this.temp_item.push(item);
                }
            }) 
        }
    }

    async getBalancePoint(list) {
        await list.forEach(element => {
          this.totalBalance += Math.round(element.pointsTotal);
        });
      }
   
}