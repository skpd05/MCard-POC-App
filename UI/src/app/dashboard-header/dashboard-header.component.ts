import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from 'src/app/sharedServices/enrolment.service';
import { HeaderComponent } from '../header/header.component'
import { DataServiceService } from 'src/app/sharedServices/data-service.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  cardNo: any;
  creditCardList: any;
  username: string;
  totalBalance: number = 0 ;
  constructor(  private userService: UserService, 
                private userdata : DataServiceService,
                public enrolmentService : EnrolmentService) {  }

  ngOnInit() {
    this.cardNo = this.userService.getCardNo();
    this.enrolmentService.getAccount(this.cardNo).subscribe((data: any)=> {
        console.log(data); 
        this.getCardList(data.creditcardsList);  
        this.getBalancePoint(data.creditcardsList);   
        this.username = data.firstName;
        this.userdata.changeMessage(this.username);
      })
    //let temp:any = this.userService.getCustmerDetails();
    
  }

  getCardList(list){
    this.creditCardList = [];
    list.forEach(element => {
      this.creditCardList.push(element.credicardnumber);
    });
  }

  getBalancePoint(list){
    list.forEach(element => {
      this.totalBalance += Math.round(element.pointsTotal);
    });
  }

}
