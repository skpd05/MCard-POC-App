import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Headers,  } from '@angular/http';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { DashboardHeaderComponent } from '../dashboard-header/dashboard-header.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutserviceService {
  public itemArray: CatalogItem[] = [
  {
    'id': 1,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee 100% Cotton Blended Material',
    'url': 'assets/product-list/clothing/tops/1.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 15, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 2,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/2.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 3,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/3.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 4,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/4.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 5,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/5.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 6,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/6.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 7,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/7.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 8,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/8.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 9,
    'name': 'GAP Women Grey Modern Long Sleeve Boatneck Tee',
    'url': 'assets/product-list/clothing/tops/9.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'tops',
    'activeCategory': false,
  },
  {
    'id': 10,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/10.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 11,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/11.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 12,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/12.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 13,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/13.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 14,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/14.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 15,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/15.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 16,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/16.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 17,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/17.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  {
    'id': 18,
    'name': 'High Star Women White Slim Fit Mid-Rise Clean Look Stretchable Jeans',
    'url': 'assets/product-list/clothing/bottoms/18.jpg',
    'ItemDescription': `A cotton-modal blend that drapes perfectly.
    Softest Supima cotton and modal knit.
    Long sleeves.
    Boatneck.Material & Care
    58% Pima Cotton, 39% Modal, 3% Spandex.
    Machine wash.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
    'itemType': 'electronic',
    'category': 'clothing',
    'subcategory': 'bottoms',
    'activeCategory': false,
  },
  ];
  public cartItemsArray = new Array;
  public cartTotalItem = 0;
  public redemptionSuccess = false;
  public showDescItemId;
  public quantity = 0;
  public cartTotal = 0;
  public disableDecreaseQuantity = true;
  public goDirectlyToAddCart = false;
  public parentCatagory = '';
  public subCatagory = '';
  public gotToMyCart = false;
  public saveRedemptionUrl = `https://redemption.apps.dev.pcf-aws.com/api/v1/loyalty/redemption/savetransaction`;
  // Observable string sources
  private _componentMethodCallSource = new Subject<DashboardHeaderComponent>();
  // Observable string streams
  public componentMethodCalled$ = this._componentMethodCallSource.asObservable();

  // Service message commands
  async callComponentMethod(){
    await this._componentMethodCallSource.next();
  }

  constructor(private _http: HttpClient) { }

  public getItems(): Array<CatalogItem> {
    return this.itemArray;
  }

  public addItems(item: CatalogItem, allowZero: boolean): void {
    this.getItemDetails(item);
    let productInfo: any;
    productInfo = this.getItemDetails(item);
    productInfo.quantity = 0;
    this.cartItemsArray.push(productInfo);
    this.increaseQuantity(item, allowZero); 
  }

  public getItemDetails(itemId): Array<CatalogItem>  {
    let itemInfo: any;
    this.itemArray.forEach(element => {
      if (element.id === itemId) {
        itemInfo = ({
        'id': element.id,
        'name': element.name,
        'url': element.url,
        'ItemDescription': element.ItemDescription,
        'quantity': element.quantity,
        'price': element.price,
        'enableMinusButton': element.enableMinusButton });
      }
    });
    return itemInfo;
  }

  public getAllCartItemList(): Array<CatalogItem>  {
    return this.cartItemsArray;
  }

  public setCurrentItem(id): void {
    this.showDescItemId = id;
  }
  public getCurrentItem(): number {
    return this.showDescItemId;
  }

  public getCartTotal(): number {
    return this.cartTotal;
  }

  public getCartItemTotal(): number {
    return this.cartItemsArray.length;
  }

  public resetCartItemArray() {
    this.cartItemsArray = [];
  }

  public setCartItemTotal(): void {
    this.cartTotalItem = this.cartItemsArray.length;
  }

  public getCartItemTotalNo(): number {
    return this.cartTotalItem;
  }

  public increaseQuantity(itemId, allowZero): void {
    const itemIndex = this.itemArray.findIndex(product => product.id === itemId);
    this.itemArray[itemIndex].quantity = this.itemArray[itemIndex].quantity + 1;
    if (!allowZero) {
      if (this.itemArray[itemIndex].quantity > 1) {
        this.itemArray[itemIndex].enableMinusButton = false;
      }  else {
        this.itemArray[itemIndex].enableMinusButton = true;
      }
    } else {
      this.itemArray[itemIndex].enableMinusButton = false;
    }
    this.incrementCartProductQuantity(itemId, allowZero);
  }

  public decreaseQuantity(itemId, allowZero): void {
    const itemIndex = this.itemArray.findIndex(product => product.id === itemId);
    if (allowZero) {
      if (this.itemArray[itemIndex].quantity > 0) {
        this.itemArray[itemIndex].quantity = this.itemArray[itemIndex].quantity - 1;
      }
    } else {
      if (this.itemArray[itemIndex].quantity > 1) {
        this.itemArray[itemIndex].quantity = this.itemArray[itemIndex].quantity - 1;
        if (this.itemArray[itemIndex].quantity === 1) {
          this.itemArray[itemIndex].enableMinusButton = true;
        }
      }
    }

    this.decrementCartProductQuantity(itemId, allowZero);
  }

  // Increment Product Quantity in Cart Product List
  public incrementCartProductQuantity(itemId, allowZero): void {
    const itemIndex = this.cartItemsArray.findIndex(product => product.id === itemId);
    this.cartItemsArray[itemIndex].quantity = this.cartItemsArray[itemIndex].quantity + 1;
    if (!allowZero) {
      if (this.cartItemsArray[itemIndex].quantity > 1) {
        this.cartItemsArray[itemIndex].enableMinusButton = false;
      } else {
        this.cartItemsArray[itemIndex].enableMinusButton = true;
      }
    } else {
      this.cartItemsArray[itemIndex].enableMinusButton = false;
    }
  }

  // Decrement Product Quantity in Cart Product List
  public decrementCartProductQuantity(itemId, allowZero): void {
    const itemIndex = this.cartItemsArray.findIndex(product => product.id === itemId);
    if (allowZero) {
      if (this.cartItemsArray[itemIndex].quantity > 1) {
        this.cartItemsArray[itemIndex].quantity = this.cartItemsArray[itemIndex].quantity - 1;
      } else {
        this.cartItemsArray[itemIndex].quantity = this.cartItemsArray[itemIndex].quantity - 1;
        this.deleteProductFromCart(itemId);
      }
    } else {
      if (this.cartItemsArray[itemIndex].quantity > 1) {
        this.cartItemsArray[itemIndex].quantity = this.cartItemsArray[itemIndex].quantity - 1;
        if (this.cartItemsArray[itemIndex].quantity === 1) {
          this.cartItemsArray[itemIndex].enableMinusButton = true;
        }
      }
    }
  }

  // Get Cart Points Total
  resetCartTotal(){
    let cartTotal = 0;
    this.cartItemsArray.forEach(element => {
      cartTotal = cartTotal + element.quantity * element.price;
    });
    return cartTotal;
  }

  deleteProductFromCart(itemId) {
    const itemIndex = this.cartItemsArray.findIndex(product => product.id === itemId);
    if (itemIndex !== -1) {
      this.cartItemsArray.splice(itemIndex, 1);
      this.updateQuantityProductList(itemId);
    }
  }

  public updateQuantityProductList(itemId): void {
    const itemIndex = this.itemArray.findIndex(product => product.id === itemId);
    if (itemIndex !== -1) {
      this.itemArray[itemIndex].quantity = 0;
    }
  }

  public setGoToMyCart(value): void {
    this.gotToMyCart = value;
  }

  public goToMyCart(): boolean {
    return this.gotToMyCart;
  }

   saveTransaction  (data){

    const headers = new Headers({ 'Content-Type': 'application/json' });

      const response =  this._http.post(this.saveRedemptionUrl,
           data,
           {
             headers: new HttpHeaders()
               .set('Content-Type', 'application/json')
               .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
               .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
               .set('Accept', 'application/json'),
                withCredentials: true
           }
         );
         return response;
   }

   private _handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned abd code ${error.status}, ` +
        `body was: ${error.error}`);
        if ( error.status === 200) {
          this.redemptionSuccess = true;
        }
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
}

  async getRedemptionStatus() {
    return this.redemptionSuccess;
  }

  public setCurrentCatagory(parentCat, subCat) {
    this.parentCatagory = parentCat;
    this.subCatagory = subCat;
    console.log('subcategory', subCat);
    this.setActiveCatagory();
  }

  public setActiveCatagory(): void {
    this.itemArray.forEach(element => {
      if (element.category === this.parentCatagory) {
        if (this.subCatagory === 'notselected') {
          element.activeCategory = true;
        } else {
            if ( element.subcategory === this.subCatagory) {
              element.activeCategory = true;
            } else {
              element.activeCategory = false;
            }
        }
      } else {
        if ( this.parentCatagory === 'notselected') {
          element.activeCategory = true;
        } else {
          element.activeCategory = false;
        }
      }
    });
  }

}

interface CatalogItem {
  'id': number;
  'name': string;
  'url': string;
  'ItemDescription': string;
  'quantity': number;
  'price': number;
  'enableMinusButton': boolean;
  'itemType': string;
  'category': string;
  'subcategory': string;
  'activeCategory': boolean;
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
