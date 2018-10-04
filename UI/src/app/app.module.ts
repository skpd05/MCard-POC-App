import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
//import { ModalModule } from 'ngx-bootstrap';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { EmailValidator } from './validator/validator.service';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ForgotuserComponent } from './forgotuser/forgotuser.component';
import { OnlynumberDirective } from './onlynumber.directive';
import { LimitToDirective } from './limiter/limit-to.directive';
import { SsnPipe } from './ssnpipe/ssn.pipe';
import { EnrolmentService } from './sharedServices/enrolment.service';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';

import { CategoryComponent } from './category/category.component';
import { MyPointsComponent } from './mypoints/mypoints.component';
import { MyCardsComponent } from './mycards/mycards.component';
import { ReactiveDrivenComponent } from './reactive/reactive.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterseptorService } from './sharedServices/http-interseptor.service';

import {DataServiceService} from './sharedServices/data-service.service'




// const appRoutes : Routes = [
//   {path: 'registration', component:RegistrationComponent}
// ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ForgotpasswordComponent,
    CatalogComponent,
    EmailValidator,
    ForgotuserComponent,
    OnlynumberDirective,
    LimitToDirective,
    SsnPipe,
    DashboardComponent,
    CategoryComponent,
    MyPointsComponent,
    MyCardsComponent,
    ReactiveDrivenComponent,
    CarouselComponent,
    DashboardHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    //ModalModule.forRoot(),
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
    timeOut: 10000,
    positionClass: 'toast-top-full-width',
    preventDuplicates: true,
    
  })
    //RouterModule.forRoot(appRoutes)
  ],
  providers: [EnrolmentService, DataServiceService ,{ provide: HTTP_INTERCEPTORS,  useClass: HttpInterseptorService,  multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
