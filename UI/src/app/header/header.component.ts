import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { DataServiceService } from 'src/app/sharedServices/data-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  username:string;
  constructor( private userService: UserService , private userdata : DataServiceService,
                private router: Router) { 
                 
                }

  ngOnInit() {
    if(this.userService.hasLoggedIn()){
      this.isLogin = true;
    }
    this.userdata.currentMessage.subscribe(user => this.username = user)
  }
  userLogout(){
    this.userService.logoutUser();
    this.userdata.changeMessage('');
    this.isLogin = false;
    this.router.navigate(['/login']);
  }

}
