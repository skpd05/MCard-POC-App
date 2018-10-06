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
    {'id': 1,
    'name': 'Sony 1 TB Wired External Hard Disk Drive  (Black)',
    'url': 'assets/product-list/pro-1.jpg',
    'ItemDescription': `Office documents and personal pictures - you can save them all in this Sony 1TB hard disk.
     Stylishly designed, this external hard disk ensures super-fast transfer speeds
     of up to 5 GB/s via a 3.0 USB and 480 Mbps via a USB 2.0 making it easy for you to save and
     transfer files.`,
     'quantity': 0,
     'price': 30,
     'enableMinusButton': false,
     'itemType': 'electronic'
  },
  {
    'id': 2,
    'name': 'Sony Headphones',
    'url': 'assets/product-list/pro2.jpg',
    'ItemDescription': `Office documents and personal pictures - you can save them all in this Sony 1TB hard disk.
     Stylishly designed, this external hard disk ensures super-fast transfer speeds
     of up to 5 GB/s via a 3.0 USB and 480 Mbps via a USB 2.0 making it easy for you to save and
     transfer files.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
     'itemType': 'electronic'
  },
  {
    'id': 3,
    'name': 'Toshiba 1 TB Wired External Hard Disk Drive  (Black)',
    'url': 'assets/product-list/pro1.jpg',
    'ItemDescription': `Office documents and personal pictures - you can save them all in this Sony 1TB hard disk.
     Stylishly designed, this external hard disk ensures super-fast transfer speeds
     of up to 5 GB/s via a 3.0 USB and 480 Mbps via a USB 2.0 making it easy for you to save and
     transfer files.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
     'itemType': 'electronic'
  },
  {
    'id': 4,
    'name': 'Sony 1 TB Wired External Hard Disk Drive  (Black)',
    'url': 'assets/product-list/pro-1.jpg',
    'ItemDescription': `Office documents and personal pictures - you can save them all in this Sony 1TB hard disk.
     Stylishly designed, this external hard disk ensures super-fast transfer speeds
     of up to 5 GB/s via a 3.0 USB and 480 Mbps via a USB 2.0 making it easy for you to save and
     transfer files.`, 'quantity': 0, 'price': 30, 'enableMinusButton': false,
     'itemType': 'electronic'
  },
  ];
  public cartItemsArray = new Array;
  public redemptionSuccess = false;
  public showDescItemId;
  public quantity = 0;
  public cartTotal = 0;
  public disableDecreaseQuantity = true;
  public goDirectlyToAddCart = false;
  public gotToMyCart = false;
  public saveRedemptionUrl = `https://redemption.apps.dev.pcf-aws.com/api/v1/loyalty/redemption/savetransaction`;
  // Observable string sources
  private _componentMethodCallSource = new Subject<DashboardHeaderComponent>();
  // Observable string streams
  public componentMethodCalled$ = this._componentMethodCallSource.asObservable();

  // Service message commands
  public callComponentMethod(): void {
    this._componentMethodCallSource.next();
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
  public resetCartTotal(): number {
    let cartTotal = 0;
    this.cartItemsArray.forEach(element => {
      cartTotal = cartTotal + element.quantity * element.price;
    });
    return cartTotal;
  }

  public deleteProductFromCart(itemId): void {
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

  public saveTransaction  (data): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });

      return this._http.post(this.saveRedemptionUrl,
           data,
           {
             headers: new HttpHeaders()
               .set('Content-Type', 'application/json')
               .set('uuid', 'f04c5720-c3ac-11e8-a355-529269fb1459')
               .set('client_id', 'f04c5edc-c3ac-11e8-a355-529269fb1459')
               .set('Accept', 'application/json'),
                withCredentials: true
           }
         )
       .pipe(
       catchError(this._handleError) // then handle the error
      );
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

  public getRedemptionStatus(): any {
    return this.redemptionSuccess;
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
