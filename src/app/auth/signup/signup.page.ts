import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm!: FormGroup;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email:[,[Validators.required]],
      password:[,[Validators.required]],
      cpassword:[,[Validators.required]],
      name:[,[Validators.required]],
      address:[,[Validators.required]],
      gst:[,[Validators.required]],
      company:[,[Validators.required]],
      mobile:[,[Validators.required]],
      city:[,[Validators.required]],
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.signupForm.value);
    
  }

}
