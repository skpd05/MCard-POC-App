import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http-services';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { UserService } from 'src/app/services/user-service';


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
        {headerName: 'Date', field: 'date' },
        {headerName: 'Transaction Description', field: 'trans_description' },
        {headerName: 'Transaction Amount($)', field: 'trans_amount'},
        {headerName: 'Earned Points', field: 'earned_points' },
        {headerName: 'Card Type', field: 'card_type'}
    ];
    rowData: any;
    
    constructor(private httpService : HttpService, 
                private enrolmentService: EnrolmentService, 
                private userService: UserService){}   
    
    ngOnInit(){        
        // this.httpService.get('path').subscribe((data: any) => {
        //     console.log(data);
        // });
        // this.enrolmentService.checkUserID({'para_1': 'RAJ1245'}).subscribe((data: any)=> {
        //     console.log("here",data);
        // });
        this.cardNo = this.userService.getCardNo();
        this.enrolmentService.getMyPoints(this.cardNo).subscribe((data: any)=> {                        
            console.log(data); 
            // this.cardDetailsList = data.creditcardsList;
            // this.temp_card_item = this.cardDetailsList.slice();
        }, (error: any)=>{
            console.log(error);
            this.errorMessage = true;
        });        
        this.httpService.getMockJSON().subscribe((data: any) => {            
            this.items = data.items;
            this.rowData = this.items;
            console.log(this.items);
            this.temp_item = (this.items).slice();            
        });
    }
        
    update_filter(x){
        this.temp_item = [];
        if(x == 'all_cards'){
            this.temp_item = (this.items).slice();
        }else{        
        this.items.forEach(item =>{
            if(item.car_number == x){
                this.temp_item.push(item);
            }
        })
    }
}
   
}