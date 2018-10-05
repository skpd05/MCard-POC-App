import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from '../sharedServices/enrolment.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //cardNo: any;
  // cardDetailsList: any = [];
  constructor(private toastr: ToastrService,  private userService: UserService,public enrolmentService : EnrolmentService) { }

  ngOnInit() {
    //  this.toastr.success('Hello world!', 'Toastr fun!');
    //this.cardNo = this.userService.getCardNo();
    // this.enrolmentService.getAccount(this.cardNo).subscribe((data: any)=> {
    //   console.log(data); 
    //   this.cardDetailsList = data.creditcardsList;     
    // })
  }

  

}
