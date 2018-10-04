import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger,style,transition,animate} from '@angular/animations';
import { EmailValidator } from '../validator/validator.service';
import { OnlynumberDirective } from '../onlynumber.directive';
import { NgForm } from '@angular/forms';
import {EnrolmentService} from '../sharedServices/enrolment.service';
import { Router }                 from '@angular/router';
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

 enrollAlready : boolean ;
 userExist : any = false;
 checkUserDetail : any = false ;
 userValues : any = {
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


 @ViewChild('f') form : any; 
  constructor(public enrolmentService : EnrolmentService , private router: Router) { }

  ngOnInit() {
  }
  showRegister(){
    this.register = !this.register ;
    this.btnTxt = 'Login';
    console.log(this.register);
  }

  loginUser(data :any){

    if(this.loginContainer){

        let validateData = {
        userid : data.email,
        pswd : data.pass
      }

    console.log(data);
     this.enrolmentService.userLogin(validateData)
	     .subscribe( data => {
          console.log(data.authenticated)
          if(data.authenticated)
          {
              //this.router.navigate(['dashboard']);
             this.SSNContainer = true;
             this.loginContainer = false
             this.SSNValidator = data.ssn
          }else{
            this.checkUserDetail = true;
          }

       },
       error => console.log(error));
    }else{
        if(this.SSNValidator == data.ssn){
          this.router.navigate(['dashboard']);
        }
        else{
            this.loginSSNError = true
        }

    }

    

  }


  validateCardNO (data) {
    let getFIrstCahr = data.split("");

   // this.cardNoError = getFIrstCahr[0] == 5 ? data.length < 16 :  

    if(getFIrstCahr[0] != 5 ){
      this.cardNoError = true
      this.isValid = false
    }else if(data.length < 19 ){
      this.cardNoError = true
      this.isValid = false     
    }else{
      this.cardNoError = false
      this.isValid = true     
    }

    console.log(getFIrstCahr)
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

    console.log(data)


     let userValidation =  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}/

     if(!userValidation.test(data) && data){
       this.form.controls.userId.invalid;
       this.form.controls.invalid
       this.userExist = true
       this.isValid = false
       this.userError = "Username must contain at least 1 uppercase charactor, 1 number, 1 special charactor, 1 lowecase charactor and must contain at lease 5 charactor "
     }else{
       this.userExist = false

       this.enrolmentService.checkUserID(data)
	     .subscribe( data => {
          if(!data.response){
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
    console.log(this.form.controls.seq1.value)
    console.log(data)
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
       this.passwordError = "Password must contain at least 1 uppercase charactor, 1 number, 1 special charactor, 1 lowecase charactor and must contain at lease 5 charactor "
       this.isValid = false
      }else{
        this.isValid = true
        this.userPassword = false
      }
  }

  goToStep(step,  form : any){
    if(step==2){

      //card no
      console.log(form)
      console.log("-----form value -----------------")
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
    
      this.enrolmentService.getvalidateCard(validateData)
	     .subscribe( data => {

          console.log(data)
            this.enrollAlready = data.enrolledAlready

            if(this.enrollAlready){
              console.log("Already login")
            }else{
              this.firstStep = false;
              this.secondStep = true;
        
        
              this.firstStep = false;
              this.secondStep = true;
             
            }

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

     this.getUserFOrmDetails.emailid = form.email
     this.getUserFOrmDetails.mobilenumber = form.mobile
     this.getUserFOrmDetails.sqa1 = "maiden"
     this.getUserFOrmDetails.sqa2 = "pet"
     this.getUserFOrmDetails.sqa3 = "last"
     this.getUserFOrmDetails.sq1 = "what is your maiden name?"
     this.getUserFOrmDetails.sq2 = "what is your pet name?"
     this.getUserFOrmDetails.sq3 = "what is last pet name?"
     this.getUserFOrmDetails.communicationaddress="SOme address" 


     this.enrolmentService.createProfile(this.getUserFOrmDetails)
	     .subscribe( data => {
          console.log(data)
          this.router.navigate(['/dashboard'])
       },
       error => console.log(error));
       console.log(this.getUserFOrmDetails)
    }

    

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

}
