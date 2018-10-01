import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../services/http-services';
import { EnrolmentService } from '../sharedServices/enrolment.service';


@Component({
    selector: 'mypoints-component',
    templateUrl: './mypoints.component.html',
    styleUrls: ['./mypoints.component.css']
})

export class MyPointsComponent{
    points: number = 9000;
    itemsInCart : number = 0;
    itemsInWishList : number = 0;
    filter_by_card: string = '';
    items: any;
    temp_item: any;
    constructor(private httpService : HttpService, private enrolmentService: EnrolmentService){}   
    
    ngOnInit(){        
        // this.httpService.get('path').subscribe((data: any) => {
        //     console.log(data);
        // });
        this.enrolmentService.checkUserID({'para_1': 'RAJ1245'}).subscribe((data: any)=> {
            console.log("here",data);
        });

        // this.enrolmentService.getvalidateCard({'para_1': 'some data'}).subscribe((data: any)=> {
        //     console.log(data);
        // });
        this.httpService.getMockJSON().subscribe((data: any) => {            
            this.items = data.items;
            console.log(this.items);
            this.temp_item = (this.items).slice();
            
        });
    }
        
    update_filter(x){
        this.temp_item = [];
        if(x == ''){
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