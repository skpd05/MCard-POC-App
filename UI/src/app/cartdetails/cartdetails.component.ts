import { Component, OnInit } from '@angular/core';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user-service';
@Component({
  selector: 'app-cartdetails',
  templateUrl: './cartdetails.component.html',
  styleUrls: ['./cartdetails.component.css']
})
export class CartdetailsComponent implements OnInit {
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
  constructor(private _router: Router, private _checkoutService: CheckoutserviceService, private _userService: UserService) { }
  public ngOnInit(): void {
    this.initializeItemDetails();
    if ( !this._checkoutService.goDirectlyToAddCart)  {
    this.showDetailsStep = true;
    this.showCartItemsStep = false;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = false;
    this.confirmationStep  = false;
    }  else {
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
    this._checkoutService.callComponentMethod();
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
  }

  public reviewOrder(): void {
    this.showCartItemsStep = false;
    this.showDetailsStep = false;
    this.billingDetailsStep  = false;
    this.reviewOrderStep  = true;
    this.confirmationStep  = false;
  }

  public doRedemption(): void {
    let itemInfo: any;
    let responseCode: any;
    const now = new Date();
    console.log('user id', this._userService.getCardNo());
    console.log('user details', this._userService.getCustmerDetails());
    this.cartProductList.forEach(element => {
        itemInfo = ({
          'cardnumber': this._userService.getCardNo(),
          'custid': '1',
          'quantity': element.quantity,
          'redeemeditem': element.name,
          'redeemedpoints': element.quantity * element.price,
          'redemptiontimestaamp': '1419038000',
          'vendorid': 'Mastercard'
        });
          this._checkoutService.saveTransaction(itemInfo).subscribe( data => {
            responseCode = data.status;
          },
          error => console.log(error));
          if ( this._checkoutService.getRedemptionStatus ) {
              this.itemRedemptionSuccess = true;
              this.showDetailsStep = false;
              this.showCartItemsStep = false;
              this.billingDetailsStep  = false;
              this.reviewOrderStep  = false;
              this.confirmationStep  = false;
          }
        });
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

