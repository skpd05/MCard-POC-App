import {CanActivate, Router} from "@angular/router";
import { UserService } from "src/app/services/user-service";
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private userService: UserService,
                private router: Router) {}; 
    
    canActivate() {
        if(this.userService.hasLoggedIn()){
            return true;
        }
       else
        this.router.navigate(['/login']);      
      }
}