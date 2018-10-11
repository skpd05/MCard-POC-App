import { Component, OnInit } from '@angular/core';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
import { EnrolmentService } from '../sharedServices/enrolment.service';
import { DataServiceService } from '../sharedServices/data-service.service';

@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
  public orderNum;
  public orderDate;
  public disableShip = false;
  public shipFirstName;
  public shipLastName;
  public shipMobile;
  public shipAddress;
  public shipCity;
  public shipCountry;
  public shipPincode;
  public shipEmail;
  public billEmail;
  public billFirstName;
  public billLastName;
  public billMobile;
  public billAddress;
  public billCity;
  public billCountry;
  public billPincode;
  public orderDetails;
  public orderConfirmationProd;
  public currentItemId;
  public itemRedemptionSuccess = false;
  public currentItemUrl;
  public currentItemName;
  public currentItemDescription;
  public currentItemPrice;
  public currentItemQuantity;
  public allProductList;
  public ship;
  public orderTotal = 0;
  public disableMinus = true;
  public cartProductList = new Array;
  public showDetailsStep = false;
  public showCartItemsStep = false;
  public billingDetailsStep = false;
  public reviewOrderStep = false;
  public confirmationStep = false;
  showSpinner = false;
  constructor(public _data: DataServiceService,
    public enrolmentService : EnrolmentService,
     private _router: Router, private _checkoutService: CheckoutserviceService, 
     public _userService: UserService) { }
  public ngOnInit(): void {
    this.initializeItemDetails();
    if ( !this._checkoutService.goDirectlyToAddCart)  {
    this.showDetailsStep = true;
    this.showCartItemsStep = false;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = false;
    this.confirmationStep  = false;
    } else {
      this.cartProductList = this._checkoutService.getAllCartItemList();
    this.showDetailsStep = false;
    this.showCartItemsStep = true;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = false;
    this.confirmationStep  = false;
    }
  }

  public goToCartDetails(): void {
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.setMinButtonStatus();
    this.showCartItemsStep = true;
    this.showDetailsStep = false;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = false;
    this.confirmationStep  = false;
    this._checkoutService.callComponentMethod();
  }

  public addToCart(itemId): void {
    this._checkoutService.addItems(itemId, false);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
  }

  public goBacktoCatalog(): void {
    this._router.navigate(['catalog']);
  }

  public decreaseQuantity(itemId):  void {
    this._checkoutService.decreaseQuantity(itemId, false);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
    this._checkoutService.callComponentMethod();
  }

  public decreaseQuantityDetail(itemId): void {
    this._checkoutService.decreaseQuantity(itemId, true);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
    this._checkoutService.callComponentMethod();
  }


  public increaseQuantity(itemId): void {
    this._checkoutService.increaseQuantity(itemId, false);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
    this._checkoutService.callComponentMethod();
  }

  public increaseQuantityDetail(itemId): void {
    this._checkoutService.increaseQuantity(itemId, true);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
    this._checkoutService.callComponentMethod();
  }

  public initializeItemDetails(): void {
    this._checkoutService.callComponentMethod();
    this.currentItemId = this._checkoutService.getCurrentItem();
    this.allProductList = this._checkoutService.getItems();
    this.orderTotal = this._checkoutService.resetCartTotal();
    this.allProductList.forEach(element => {
     if ( element.id === this.currentItemId ) {
       this.currentItemUrl = element.url;
       this.currentItemName = element.name;
       this.currentItemDescription = element.ItemDescription;
       this.currentItemPrice = element.price;
       this.currentItemQuantity = element.quantity;
       this.disableMinus = false;
     }
    });
  }

  public proceedToShipping(): void {
    this.showCartItemsStep = false;
    this.showDetailsStep = false;
    this.billingDetailsStep  = true;
    this.reviewOrderStep  = false;
    this.confirmationStep  = false;
  }

  public setMinButtonStatus(): void {
    this.cartProductList.forEach(element => {
      if (element.quantity === 1 ) {
        element.enableMinusButton = true;
      }
    });
  }

  public removeFromCart(itemId): void {
    this._checkoutService.deleteProductFromCart(itemId);
    this.cartProductList = this._checkoutService.getAllCartItemList();
    this.initializeItemDetails();
    this.orderTotal = this._checkoutService.resetCartTotal();
  }

  public reviewOrder(): void {
    this.showCartItemsStep = false;
    this.showDetailsStep = false;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = true;
    this.confirmationStep  = false;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
 }

  public  doRedemption() {
    if (this.orderTotal > this._data.totalBalance) {
      this.itemRedemptionSuccess = false;
      this.showDetailsStep = false;
      this.showCartItemsStep = false;
      this.billingDetailsStep  = false;
      this.reviewOrderStep  = false;
      this.confirmationStep  = true;
    } else {
      this.orderNum = this.randomInt(11111, 99999);
      this.orderDate = new Date().toLocaleDateString();
      this.orderConfirmationProd = Object.assign([], this.cartProductList);
      this.cartProductList.forEach(element => {
        this._checkoutService.deleteProductFromCart(element.id);
       });
      this.doRedemptionCallApi();
    }
  }

  public doRedemptionCallApi(): void {
    let itemInfo: any;
    let responseCode: any;
    console.log('user id', this._data.creditCardList[0]);
    console.log('user details', this._userService.getCustmerDetails());
    this.showSpinner = true;
    this.orderConfirmationProd.forEach(element => {
        itemInfo = ({
          'cardnumber': this._data.creditCardList[0],
          'custid': '1',
          'quantity': element.quantity,
          'redeemeditem': element.name,
          'redeemedpoints': element.quantity * element.price,
          'redemptiontimestaamp': '1419038000',
          'vendorid': 'Mastercard'
        });

          this._checkoutService.saveTransaction(itemInfo).subscribe( data => {

            responseCode = data;
            console.log(responseCode);
            const cardNo = this._userService.getCardNo();
            this.enrolmentService.getAccount(cardNo).then((userdata: any)=> {
                this._data.setUserInfo(userdata);
                this.cartProductList = this._checkoutService.getAllCartItemList();
                this._data.cartTotalItem = this._checkoutService.getCartItemTotal();
                this.itemRedemptionSuccess = true;
                this.showDetailsStep = false;
                this.showCartItemsStep = false;
                this.billingDetailsStep  = false;
                this.reviewOrderStep  = false;
                this.confirmationStep  = true;
                this.showSpinner = false;
            });
          },
         );
        });
      }

      public copyBillingAddress(): void {
        if ( this.disableShip) {
        this.shipFirstName = '';
        this.shipLastName = '';
        this.shipMobile = '';
        this.shipAddress = '';
        this.shipCity = '';
        this.shipCountry = '';
        this.shipPincode = '';
        this.shipEmail = '';
        this.disableShip = false;
        } else {
          this.disableShip = true;
          this.shipFirstName = this.billFirstName;
          this.shipLastName = this.billLastName;
          this.shipMobile = this.billMobile;
          this.shipAddress = this.billAddress;
          this.shipCity = this.billCity;
          this.shipCountry = this.billCountry;
          this.shipPincode = this.billPincode;
          this.shipEmail = this.billEmail;
        }
      }
}

interface RedemptionDetails {
  'cardNumber': number;
  'custId': string;
  'itemredeemed': string;
  'pointsredeemed': number;
  'itemquantity': number;
  'vendorid': number;
  'time': Date;
}

interface AddressDetails {
  'firstName': string;
  'lastName': string;
  'phone': number;
  'address': string;
  'zipcode': number;

}
