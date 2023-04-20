import { HandlerService } from './../../handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { Database, onValue, ref } from '@angular/fire/database';
import { getDatabase } from '@firebase/database';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { Auth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm!: FormGroup;
isShowText: boolean = false;

dbkey!: any;

loginSub!: Subscription;
getUserSub!: Subscription;
  constructor(private fb: FormBuilder,
              private router: Router,
              private http: HttpClient,
              private data: DataService,
              private db: Database,
              private auth: Auth,
              private handlerService: HandlerService) { 
                this.loginForm = this.fb.group({
                  email:[,[Validators.required, Validators.email]],
                  password:[,[Validators.required, Validators.min(6)]],
                })

                const database = getDatabase();

              }

  async ngOnInit() {
    this.dbkey = await this.data.get("userKey");
    console.log(this.dbkey);
    if(this.dbkey == null){
      console.log("Not Regisred");
      this.isShowText = false;
    }

    else if(this.dbkey != null){
      console.log("Show tesxt");
      this.isShowText = true;
      const starCountRef = ref(this.db, 'Users/' + this.dbkey + '/isAccepted');
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if(data == true){
          this.isShowText = false;
        }
        
      });
      
    }

    
  }


  IonViewDidLeave(){
    this.loginSub.unsubscribe();
    this.getUserSub.unsubscribe();
  }
  async onSubmit(){
    this.handlerService.presentLoading("Logging you in...");
    console.log(this.loginForm.value);

    let body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.loginSub = this.http.post(environment.API + "/user/login", body)
    .subscribe(async(user:any) =>{
      console.log(user);
    //  this.handlerService.dismissLoading();
      // if(user["message"] == "Not verified"){
      //   this.handlerService.dismissLoading();
      // }
      this.checkUserForLogin(user["userId"]); 
      
    }, async (error) =>{
      console.log(error.status);
      console.log(error);
      this.handlerService.presentAlert("ERROR", error.message, "", "Okay");
      this.handlerService.dismissLoading();
      this.handlerService.hapticsImpactMedium();
      
    })
   
    

  }

  async checkUserForLogin(userId: any){
    console.log(userId);

    this.getUserSub = this.http.get(environment.API +`/user/${userId}`).subscribe({
      next: async (user:any) =>{
        console.log(user);
        console.log(user['user']['isActive']);
        
        if(user['user']['isActive'] === false){
          this.handlerService.dismissLoading();
          this.handlerService.hapticsImpactMedium();
          this.handlerService.presentAlert("Not Verified", "Admin has not accepted your request.", "Please wait 2 days for verification", "Okay");
          
          
        }else if(user['user']['isActive'] === true) {
          this.handlerService.dismissLoading();
          this.handlerService.hapticsImpactMedium();
          await this.data.set("userId",userId);
          this.router.navigate(['folder', 'Home']);
        }


      }, 
      error: (error) =>{
        console.log(error);
        this.handlerService.dismissLoading();
          this.handlerService.hapticsImpactMedium();
        
      }
    })
    
  }
}
