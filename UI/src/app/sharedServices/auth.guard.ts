import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {DataServiceService} from '../sharedServices/data-service.service'
import { UserService } from 'src/app/services/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

   constructor(private dataService: DataServiceService, public router: Router, private userService: UserService) {}

 

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    // if(this.dataService.userData){
      if(this.userService.hasLoggedIn()){
         return true;
    }else{
      this.router.navigate(['/login'])
    }
   
  }
}
