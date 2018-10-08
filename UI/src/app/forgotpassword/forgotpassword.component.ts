import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailValidator } from '../validator/validator.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  showConfirm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(forgotFrm: NgForm){
    console.log(forgotFrm);    
    this.showConfirm = true;
    
  }
  
}
