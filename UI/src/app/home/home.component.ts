import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators}  from '@angular/forms';
//import { stringify } from '@angular/core/src/render3/util';
//import { variable } from '@angular/compiler/src/output/output_ast';
//import {OwlCarousel} from 'ngx-owl-carousel';
import { setTheme } from 'ngx-bootstrap/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  date; //date Variable
  logedInForm; //These are variables
  emailId;
  password;
  cardNo;
  display='none'; //default Variable

  constructor() { 
    setTheme('bs3');
  }

  ngOnInit() {
    this.date = new Date(); // Today date and time
    //Login Validation
    this.logedInForm = new FormGroup({
      cardNo : new FormControl(null, Validators.required),
      emailId: new FormControl(null, Validators.compose([Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl(null, [
           Validators.minLength(8),
           Validators.required])
    });
  }

  // Model Driven Form - login
  userLogin(data) {
    this.emailId = data.emailId;
    this.password = data.password;
    alert(JSON.stringify(data));
  }

  openModalDialog(){
    this.display='block'; //Set block css
 }

 closeModalDialog(){
  this.display='none'; //set none css after close dialog
 }
 

}
