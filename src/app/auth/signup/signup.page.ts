import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/handler.service';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { async } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
 
  userRef:any;

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
    

    // const newUserKey = push(child(ref(this.db), 'Users')).key;
    // set(ref(this.db, 'Users/' + newUserKey), {
    //   email: this.signupForm.value.email,
    //   password: this.signupForm.value.password,
    //   name: this.signupForm.value.name,
    //   address: this.signupForm.value.address,
    //   gst: this.signupForm.value.gst,
    //   company: this.signupForm.value.company,
    //   mobile: this.signupForm.value.mobile,
    //   city: this.signupForm.value.city,
    //   message:"Request Sent",
    //   isAccepted: false,
    //   key:newUserKey
    // })
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
