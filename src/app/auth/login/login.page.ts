import { HandlerService } from './../../handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private handlerService: HandlerService) { 
                this.loginForm = this.fb.group({
                  email:[,[Validators.required]],
                  password:[,[Validators.required]],
                })
              }

  ngOnInit() {
  }


  onSubmit(){
    this.handlerService.presentLoading("Logging you in...");
    console.log(this.loginForm.value);

    setTimeout(() =>{
      this.handlerService.dismissLoading();
      this.handlerService.hapticsImpactMedium();
      this.router.navigate(['folder', 'Home']);
    }, 2000)
    

  }
}
