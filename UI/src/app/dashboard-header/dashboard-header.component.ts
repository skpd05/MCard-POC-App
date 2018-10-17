import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service';
import { EnrolmentService } from 'src/app/sharedServices/enrolment.service';
import { HeaderComponent } from '../header/header.component';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.css']
})
export class DashboardHeaderComponent implements OnInit {
  cardNo: any;
  creditCardList: any;
  username: string;
  totalBalance = 0 ;
  public cartItemTotal = 0;
  public itemList;
  constructor(  private userService: UserService,
                private userdata: DataServiceService,
                public enrolmentService: EnrolmentService, private _router: Router, private _checkoutService: CheckoutserviceService) {  }

  async ngOnInit() {
    this.itemList = await this._checkoutService.getItems();
    this.cardNo = await this.userService.getCardNo();
    await this.enrolmentService.getAccount(this.cardNo).then((data: any) => {
        this.getCardList(data.creditcardsList);
        this.getBalancePoint(data.creditcardsList);
        this.username = data.firstName;
        this.userdata.changeMessage(this.username);
      });
      await this._checkoutService.componentMethodCalled$.subscribe(
        () => {
          this.cartItemTotal = this._checkoutService.getCartItemTotal();
        }
      );
      await this._checkoutService.setCartItemTotal();
      this.cartItemTotal = await this._checkoutService.getCartItemTotalNo();
    // let temp:any = this.userService.getCustmerDetails();
  }

  getCardList(list): any  {
    this.creditCardList = [];
    list.forEach(element => {
      this.creditCardList.push(element.credicardnumber);
    });
  }

  getBalancePoint(list): any {
    list.forEach(element => {
      this.totalBalance += Math.round(element.pointsTotal);
    });
  }

  public setCurrentCategory(parentCat, subCat) {
   this._checkoutService.setCurrentCatagory(parentCat, subCat);
   this._router.navigate(['catalog']);
  }

  public goToCart() {
    this._checkoutService.goDirectlyToAddCart = true;
    this._router.navigate(['buynow']);
  }


}
