import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'reactive-drivenform',
    templateUrl: './reactive.component.html',
    styleUrls: ['./reactive.component.css']
})

export class ReactiveDrivenComponent implements OnInit{
    points: number = 9000;
    itemsInCart : number = 0;
    itemsInWishList : number = 0;
    constructor(){}

    ngOnInit(){
        // use services to get item in cart and wishlsit from backend
    }
    
    addToCart(){
        this.itemsInCart = this.itemsInCart + 1;
    }
    addToWishList(){
        this.itemsInWishList = this.itemsInWishList + 1;
    }

}