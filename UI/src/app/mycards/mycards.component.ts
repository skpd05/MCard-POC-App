import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'mycards-component',
    templateUrl: './mycards.component.html',
    styleUrls: ['./mycards.component.css']
})

export class MyCardsComponent{
    points: number = 9000;
    itemsInCart : number = 0;
    itemsInWishList : number = 0;
    filter_by_card: string = 'all_cards';
    sub: any;
    
    constructor(  private route: ActivatedRoute){}
    ngOnInit(){
        this.sub = this.route.paramMap.subscribe((params: any) => {
            console.log(params.params.params);
            this.filter_by_card = params.params.params;
            this.update_filter(params.params.params)
        })        
    }
    
    items = [
        {
            date: new Date().toLocaleDateString(),
            car_number: 89988990,
            trans_description: 'TACO BELL',
            trans_amount: 60.23,
            earned_points: 100,
            card_type: 'DB'
        },
        {
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },{
            date: new Date().toLocaleDateString(),
            car_number: 11221121,
            trans_description: 'B&H PHOTO 800-000-096',
            trans_amount: 7560,
            earned_points: 100,
            card_type: 'CR'
        },

    ];
    temp_item = (this.items).slice();
    
    update_filter(x){
        this.temp_item = [];
        if(x == 'all_cards'){
            this.temp_item = (this.items).slice();
        }else{        
        this.items.forEach(item =>{
            if(item.car_number == x){
                this.temp_item.push(item);
            }
        })
    }
}
   

}