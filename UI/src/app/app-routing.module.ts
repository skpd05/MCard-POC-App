import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotuserComponent } from './forgotuser/forgotuser.component';

import { MyPointsComponent } from './mypoints/mypoints.component';
import { MyCardsComponent } from './mycards/mycards.component';
import { ReactiveDrivenComponent } from './reactive/reactive.component';
import { AuthGuard }              from './sharedServices/auth.guard';
import { CartdetailsComponent } from './cartdetails/cartdetails.component';
import { CatalogComponent } from './catalog/catalog.component';

const appRoutes : Routes = [
 { path:'',component:LoginComponent},
 { path: 'login', component:LoginComponent},
 { path: 'forgotPasswod', component:ForgotpasswordComponent},
 { path: 'forgotUser', component:ForgotuserComponent},
  { path: 'dashboard', component:DashboardComponent,  canActivate: [AuthGuard] },
   { path: 'mypoints', component:MyPointsComponent, canActivate: [AuthGuard] },
 { path: 'mycards', component:MyCardsComponent, canActivate: [AuthGuard] },
 { path: 'mycards/:params', component:MyCardsComponent, canActivate: [AuthGuard] },
 { path: 'reactive', component:ReactiveDrivenComponent, canActivate: [AuthGuard] }, 
 { path: 'buynow' ,component:CartdetailsComponent,canActivate: [AuthGuard] },
 { path: 'catalog' ,component:CatalogComponent,canActivate: [AuthGuard] }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, {useHash: true})],
    exports:[RouterModule]
})

export class AppRoutingModule{

}