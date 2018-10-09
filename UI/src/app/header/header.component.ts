import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { CheckoutserviceService } from '../services/checkoutservice.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cardNo: any;
  creditCardList: any;
  username: string;
  totalBalance = 0 ;
  public cartItemTotal = 0;
  isLogin: boolean = false;
  public itemList;
  constructor(  private userService: UserService,
                private userdata: DataServiceService,
                public enrolmentService: EnrolmentService, private _router: Router, private _checkoutService: CheckoutserviceService) {  }

  async ngOnInit() {
    this.itemList = await this._checkoutService.getItems();
    this.cardNo = await this.userService.getCardNo();
    await this.enrolmentService.getAccount(this.cardNo).then((data: any) => {
        console.log(data);
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

  userLogout(){
    this.userService.logoutUser();
    this.userdata.changeMessage('');
    this.isLogin = false;
    this._router.navigate(['/login']);
  }

}
