import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmailValidator } from '../validator/validator.service';

@Component({
  selector: 'app-forgotuser',
  templateUrl: './forgotuser.component.html',
  styleUrls: ['./forgotuser.component.css']
})
export class ForgotuserComponent implements OnInit {
  showConfirm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(forgotFrm: NgForm){
    console.log(forgotFrm);
    this.showConfirm = true;
  }

}
