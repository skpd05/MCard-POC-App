import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { AnalyticsService } from '../services/analytics.service';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public itemid = 9;
  public itemArray;
  public showquantitybar = 0;
  showSpinner : boolean = false;
  @ViewChild('clothing')
  private clothingElement: ElementRef;

  @ViewChild('travel')
  private travelElement: ElementRef;

  @ViewChild('electronics')
  private electronicsElement: ElementRef;

  constructor(private _router: Router, private _http: HttpClient,
    private  _checkoutService: CheckoutserviceService, private _userService : UserService,
    private _analyticsService: AnalyticsService ) {
  }
  async ngOnInit(){
    //await this._analyticsService.analyseCustomerTransactions(this._userService.customerDetails.custid);
    await this._checkoutService.getItems();
    
    this.showSpinner = true;
    let transactions: any = await this._analyticsService.analyseCustomerTransactions(this._userService.customerDetails.custid);
    if(transactions.profiles[0].transClassification.length>0){
      let majorTrans : string = transactions.profiles[0].transClassification[0].classType;
      
      if(majorTrans==="Electronics"){
        await this._checkoutService.setCurrentCatagory('electronics','notselected');
        let el: HTMLElement = this.electronicsElement.nativeElement as HTMLElement;
        el.click();
        this.showSpinner = false;
      }else if(majorTrans==="Travel&Leisure"){
        await this._checkoutService.setCurrentCatagory('travel','notselected');
        let el: HTMLElement = this.travelElement.nativeElement as HTMLElement;
        el.click();
        this.showSpinner = false;
      }else{
        await this._checkoutService.setCurrentCatagory('lifestyle','tops');
        let el: HTMLElement = this.clothingElement.nativeElement as HTMLElement;
        el.click();
        this.showSpinner = false;
      }
    }else{
      await this._checkoutService.setCurrentCatagory('lifestyle','tops');
      let el: HTMLElement = this.clothingElement.nativeElement as HTMLElement;
      el.click();
      this.showSpinner = false;
    }
    
    this.itemArray = this._checkoutService.itemArray;
  }

  public showProductDetails(item): void {
    this._checkoutService.setCurrentItem(item);
    this._router.navigate(['buynow']);
  }

  public addToCart(itemId): void {
    this._checkoutService.addItems(itemId, true);
    //this.itemArray = this._checkoutService.getItems();
   // this._checkoutService.callComponentMethod();
  }

  public goToCart(): void {
    this._checkoutService.goDirectlyToAddCart = true;
    this._router.navigate(['buynow']);
  }

  public decreaseQuantity(itemId): void {
    this._checkoutService.decreaseQuantity(itemId, true);
 //   this.itemArray = this._checkoutService.getItems();
  //  this._checkoutService.callComponentMethod();
  }

  public increaseQuantity(itemId): void {
    this._checkoutService.increaseQuantity(itemId, true);
    //this.itemArray = this._checkoutService.getItems();
    //this._checkoutService.callComponentMethod();
  }

  public selectFromSideMenu(parentCategory, subCategory){
    this._checkoutService.setCurrentCatagory(parentCategory, subCategory);
    this.itemArray = this._checkoutService.itemArray.filter(item => item.activeCategory === true);
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
