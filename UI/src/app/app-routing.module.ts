import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotuserComponent } from './forgotuser/forgotuser.component';

import { MyPointsComponent } from './mypoints/mypoints.component';
import { MyCardsComponent } from './mycards/mycards.component';
import { ReactiveDrivenComponent } from './reactive/reactive.component';

const appRoutes : Routes = [
 { path:'',component:LoginComponent},
 { path: 'login', component:LoginComponent},
 { path: 'forgotPasswod', component:ForgotpasswordComponent},
 { path: 'forgotUser', component:ForgotuserComponent},
  { path: 'dashboard', component:DashboardComponent },
   { path: 'mypoints', component:MyPointsComponent },
 { path: 'mycards', component:MyCardsComponent },
 { path: 'mycards/:params', component:MyCardsComponent },
 { path: 'reactive', component:ReactiveDrivenComponent }, 
 
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}