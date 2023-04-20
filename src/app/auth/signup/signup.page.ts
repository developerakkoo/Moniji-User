import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/handler.service';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Subscription, async } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
 
  userRef:any;

  signupSub!: Subscription;

  constructor(public fb: FormBuilder,
              private http: HttpClient,
              private data: DataService,
              private handler: HandlerService,
              private router: Router,
              ) {

               
    this.signupForm = this.fb.group({
      email:[,[Validators.required, Validators.email],],
      password:[,[
        Validators.required,
        Validators.minLength(6),
 
      ]],
      cpassword:[,[
        Validators.required,
        Validators.minLength(6),
     
      ]],
      name:[,[Validators.required]],
      address:[,[Validators.required]],
      gst:[,[Validators.required]],
      company:[,[Validators.required]],
      mobile:[,[Validators.required]],
      city:[,[Validators.required]],
    },);
    this.signupForm.addValidators(
      this.matchValidator(this.signupForm.get('password') as FormControl, this.signupForm.get('cpassword') as FormControl)
    );
   }

  ngOnInit() {
  }


  IonViewDidLeave(){
    this.signupSub.unsubscribe();
  }
   matchValidator(
    control: AbstractControl,
    controlTwo: AbstractControl
  ): ValidatorFn {
    return () => {
      if (control.value !== controlTwo.value)
        return { match_error: 'Value does not match' };
      return null;
    };
  }

  async onSubmit(){
    this.handler.presentLoading("Registering user...");
    let body = 
      {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        name: this.signupForm.value.name,
        address: this.signupForm.value.address,
        gst: this.signupForm.value.gst,
        company: this.signupForm.value.company,
        mobileno: this.signupForm.value.mobile,
        city: this.signupForm.value.city,
        isActive: false,
        isBlocked: false
      }
    

      this.signupSub = this.http.post(environment.API + '/user/signup', body)
      .subscribe(async (data: any) =>{
        console.log(data);
        await this.data.set("userKey", data['userId']);
        this.handler.dismissLoading();
        this.router.navigate(['register-complete']);
      }, (error) =>{
        this.handler.dismissLoading();
        console.log(error);
        this.handler.presentAlert("Error", "", "Please try Again!", "Okay");
        
      })
    // const newUserKey = push(child(ref(this.db), 'Users')).key;
   
    // .then(async() => {
    //   // Data saved successfully!
    //     //Save the key to local storage
    // await this.data.set("userKey", newUserKey);
    // this.handler.dismissLoading();

    // this.router.navigate(['register-complete']);
    // })
    // .catch((error) => {
    //   console.log(error);
    //   this.handler.presentAlert("Error", "", error.message, "Okay");
    //   this.handler.dismissLoading();
  
    // });

    
  }

}
