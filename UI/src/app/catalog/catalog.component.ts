import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckoutserviceService } from '../services/checkoutservice.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  public itemid = 9;
  public itemArray;
  public showquantitybar = 0;
  constructor(private _router: Router, private _http: HttpClient,
    private  _checkoutService: CheckoutserviceService) {
  }
  async ngOnInit(){
    await this._checkoutService.getItems();
    await this._checkoutService.setCurrentCatagory('lifestyle','tops');
    this.itemArray = this._checkoutService.itemArray;
  }

  public showProductDetails(item): void {
    this._checkoutService.setCurrentItem(item);
    this._router.navigate(['buynow']);
  }

  public addToCart(itemId): void {
    this._checkoutService.addItems(itemId, true);
    this.itemArray = this._checkoutService.getItems();
    this._checkoutService.callComponentMethod();
  }

  public goToCart(): void {
    this._checkoutService.goDirectlyToAddCart = true;
    this._router.navigate(['buynow']);
  }

  public decreaseQuantity(itemId): void {
    this._checkoutService.decreaseQuantity(itemId, true);
    this.itemArray = this._checkoutService.getItems();
    this._checkoutService.callComponentMethod();
  }

  public increaseQuantity(itemId): void {
    this._checkoutService.increaseQuantity(itemId, true);
    this.itemArray = this._checkoutService.getItems();
    this._checkoutService.callComponentMethod();
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
