import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger,style,transition,animate} from '@angular/animations';
import { EmailValidator } from '../validator/validator.service';
import { OnlynumberDirective } from '../onlynumber.directive';
import { NgForm } from '@angular/forms';
import {EnrolmentService} from '../sharedServices/enrolment.service';
import { Router }                 from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import {DataServiceService} from '../sharedServices/data-service.service'
import { UserService } from 'src/app/services/user-service';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations:[
    trigger('slidleft',[
      transition('void => *',[
        style({transform: 'translateX(-100%)'}),
        animate(300)
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {
 register: boolean = false;
 btnTxt : string = 'Register';
 firstStep : boolean = true;
 secondStep : boolean = false;
 thirdStep : boolean = false;
 fourtStep : boolean = false;
 finalStep : boolean = false;
 customer_api : string = environment.customer_api;

 enrollAlready : boolean ;
 userExist : any = false;
 checkUserDetail : any = false ;
 userValues : any = {
  "zip" : "",
  "SSN" : "",
  "userId" : "",
  "password" : "",
  "email" : "",
  "mobile" : "",
  "rePassword" : "",
  "cardNo":""
   };

   getUserFOrmDetails : any = {}
   dateError : any = true;
   userError : any
   userPassword : any
   passwordError : any
   isValid : any
   confirmError :any 
   SeqError : any = false
   emailError :any =false;
   mobileNoError : any = false
   loginContainer : any = true
   SSNValidator : any ;
   SSNContainer :any  = false;
   loginSSNError: any = false;
   cardNoError : any = false;
   invalidZipError : boolean = false;
   accalreadyError :any = false;
   invalidDataError : boolean = false;
   userLogindata: any ;
   userdata: any;
   cardno: any;
   showSpinner : boolean = false;


 @ViewChild('f') form : any; 
  constructor(private dataService : DataServiceService,private userService: UserService, public enrolmentService : EnrolmentService , private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if(this.dataService.username!=null || this.dataService.username!=undefined){
      this.router.navigate(['/dashboard']);
    }
  }
  showRegister(){
    this.register = !this.register ;
    this.btnTxt = 'Login'; 
    this.firstStep = true;
    this.secondStep = false;
    this.thirdStep = false;
    this.fourtStep = false;
    this.finalStep = false;
    this.userValues.zip = "";
    this.userValues.SSN = "";
    this.userValues.userId = "";
    this.userValues.password = "";
    this.userValues.email = "";
    this.userValues.mobile = "";
    this.userValues.rePassword = "";
    this.userValues.cardNo = "";
   
   /* Remove this if face difficulty before demo*/
    this.dateError = false;
    this.userError = "";
    this.passwordError = "";
    this.confirmError = false;
    this.SeqError =false;
    this.emailError = false;
    this.mobileNoError =false
    this.loginSSNError = false;
    this.cardNoError = false;
    this.accalreadyError = false;
    this.invalidDataError = false;
    this.checkUserDetail = false;

    /* End Remove this if face difficulty before demo*/
  }

  loginUser(data :any){
    this.showSpinner = true;
    if(this.loginContainer){

        let validateData = {
        userid : data.email,
        pswd : data.pass
      }

     this.enrolmentService.userLogin(validateData)
	     .subscribe( data => {
          this.userLogindata = data;
          if(data.authenticated)
          {
             this.SSNContainer = true;
             this.loginContainer = false
             this.SSNValidator = data.ssn;
             this.dataService.userData = data;
             this.userdata = data;
             this.cardno = data.cardnumber;
             this.checkUserDetail = false;
          }else{
            this.checkUserDetail = true;
          }
          this.showSpinner = false;
       },
       error => console.log(error));
    }else{  
      this.showSpinner = true;    
        if(this.SSNValidator == data.ssn){          
          this.dataService.userData = this.userLogindata;          
          this.userService.setCustomerDetails(this.userdata);
          this.userService.setCardNo(this.cardno);    
          this.userService.loginUser();      
          this.enrolmentService.getAccount(this.cardno).then((data: any) => {
            this.dataService.username = data.firstName;
            this.dataService.setUserInfo(data);  
            this.showSpinner = false;
            this.router.navigate(['/dashboard']);
          });         
          
        }
        else{
            this.loginSSNError = true
            this.showSpinner = false;
        }

    }
  }
  showLogin(){
    this.loginContainer = true;
    this.SSNContainer = false;
  }
  validateNumber (data){

       var reg = new RegExp('^[0-9]+$');
    
        if(!reg.test(data) && data){
          this.cardNoError = true
          this.isValid = false
        }else{
          this.cardNoError = false
          this.isValid = true     
        }

  }


  validateCardNO (data) {
    let getFIrstCahr = data.split("");

    

   // this.cardNoError = getFIrstCahr[0] == 5 ? data.length < 16 :  

    if(getFIrstCahr[0] != 5 ){
      this.cardNoError = true
      this.isValid = false
    }else if(!(data.length == 19 || data.length == 16)){
      this.cardNoError = true
      this.isValid = false     
    }else{
      this.cardNoError = false
      this.isValid = true     
    }
  }

  validDate(date){
    let age;
    let Convertdate : any  = new Date(date.dob)
    if(date.dob){
            var timeDiff = Math.abs(Date.now() - Convertdate);
            //Used Math.floor instead of Math.ceil
            //so 26 years and 140 days would be considered as 26, not 27.
            age = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

            if(age > 18){
              this.form.controls.dob.valid;
              this.dateError = true;
              this.isValid = true
              this.form.controls.valid;
            }else{
              this.form.controls.dob.invalid;
              this.form.controls.invalid;
              this.isValid = false
              this.dateError = false;
            }
        }


  }

  checkUserId (data) {
     let userValidation =  /[A-Za-z0-9@]*/

     if(!userValidation.test(data) && data){
       this.form.controls.userId.invalid;
       this.form.controls.invalid
       this.userExist = true
       this.isValid = false
       this.userError = "User id must be alphanumeric."
     }else{
       this.userExist = false

       this.enrolmentService.checkUserID(data)
	     .subscribe( responseData => {
          if(responseData != "available"){
            this.userExist = true
             this.form.controls.userId.invalid;
             this.isValid = false
             
              this.form.controls.invalid
             this.userError = "User already exist"
          }else{
            this.userExist = false
             this.form.controls.userId.valid;
             this.isValid = true
            this.form.controls.valid
          }
       },
        error => console.log(error));


     }

    
  }

  confirmPassord (data) {
    if(this.form.controls.password.value == data){
       this.isValid = true
       this.confirmError = false
    }else{
      this.isValid = false
      this.confirmError = true
    }
  }

  validateMobile(data){
      if(data.length >= 10){
        this.mobileNoError = false
        this.isValid = true
      }else{
        this.mobileNoError = true
        this.isValid = false
      }
  }

  checkSeq(data){

    if(this.form.controls.seq1.value == data){
      this.SeqError = true;
      this.isValid = false
    }else{
      this.SeqError = false;
      this.isValid = true;
    }
  }

  validateEmail(data){
     var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


      if(!EMAIL_REGEXP.test(data) && data){
        this.emailError = true;
        this.isValid = false
      }else{
        this.emailError = false;
        this.isValid = true;
      }
  }


  checkPassword(data){
      let passwordValidation =  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}/


      if(!passwordValidation.test(data) && data){
       
            this.form.controls.password.invalid;  
            this.form.controls['password'].markAsTouched(true);
            
       this.userPassword = true
       this.passwordError = "Password must contain at least 1 uppercase character, 1 number, 1 special character, 1 lowecase character and must contain at lease 5 character "
       this.isValid = false
      }else{
        this.isValid = true
        this.userPassword = false
      }
  }

  goToStep(step,  form : any){
    if(step==2){
      let validateData = {
        cardnumber : form.cardNo.toString(),
        ssn : form.SSN.toString(),
        dob : "1978-03-03",
        zipcode : form.zip.toString()
      }

      //this.getUserFOrmDetails :.cardNo  = "";

     this.getUserFOrmDetails.cardnumber = form.cardNo
     this.getUserFOrmDetails.ssn = form.SSN
     this.getUserFOrmDetails.dob = form.dob
     this.showSpinner = true;
      this.enrolmentService.getvalidateCard(validateData)
	     .subscribe( data => {
        if(data!=null){
          this.invalidDataError = false;
          this.enrollAlready = data.enrolledAlready

          if(this.enrollAlready){
            this.accalreadyError = true 
          }else{
            this.firstStep = false;
            this.secondStep = true;
            this.accalreadyError = false 
      
            this.firstStep = false;
            this.secondStep = true;
           
          }
        }else{
          this.invalidDataError = true;
        }
        this.showSpinner = false;

       },
        error => console.log(error));

    
    }
    if(step==3){

     this.getUserFOrmDetails.userid = form.userId
     this.getUserFOrmDetails.pswd = form.password

      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep = true;
    }
    if(step==4){

       this.getUserFOrmDetails.userid = form.userId
       this.getUserFOrmDetails.pswd = form.password
       this.getUserFOrmDetails.seqAns1 = form.seq2Ans
       this.getUserFOrmDetails.seqAns2 = form.seq1Ans
       this.getUserFOrmDetails.seq1 = form.seq1
       this.getUserFOrmDetails.seq2 = form.seq2

      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep = false;
      this.fourtStep = true;
    }

    if(step==5){


    }

    

  }

  doRegister(step,form){
    this.getUserFOrmDetails.emailid = form.email
    this.getUserFOrmDetails.mobilenumber = form.mobile
    this.getUserFOrmDetails.sqa1 = "maiden"
    this.getUserFOrmDetails.sqa2 = "pet"
    this.getUserFOrmDetails.sqa3 = "last"
    this.getUserFOrmDetails.sq1 = "what is your maiden name?"
    this.getUserFOrmDetails.sq2 = "what is your pet name?"
    this.getUserFOrmDetails.sq3 = "what is last pet name?"
    this.getUserFOrmDetails.communicationaddress="SOme address" 

    this.firstStep = false;
    this.secondStep = false;
    this.thirdStep = false;
    this.showSpinner = true;
    this.enrolmentService.createProfile(this.getUserFOrmDetails)
      .subscribe( data => {
         
         this.toastr.success('Your profile is created successfuly please login with your credentials ');
         this.firstStep = false;
         this.secondStep = false;
         this.thirdStep = false;
         this.fourtStep = false;
         this.finalStep = true;
         this.showSpinner = false;
        // this.router.navigate(['/login']);
      },
      error => console.log(error));
  }

  goToPrevious(step){
    if(step==3){
      this.firstStep = false;
      this.secondStep = false;
      this.thirdStep = true;
      this.fourtStep = false;
    }

    if(step==2){
      this.firstStep = false;
      this.secondStep = true;
      this.thirdStep = false;
      this.fourtStep = false;
    }
    if(step==1){
      this.firstStep = true;
      this.secondStep = false;
      this.thirdStep = false;
      this.fourtStep = false;
    }
  }

  onlyNumberKey(event) {
    // Allow to enter only numbers (0-9) in text filed
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }
}
