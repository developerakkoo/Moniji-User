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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
loginForm!: FormGroup;
isShowText: boolean = false;

dbkey!: any;
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


  async onSubmit(){
    this.handlerService.presentLoading("Logging you in...");
    console.log(this.loginForm.value);
    signInWithEmailAndPassword(this.auth,this.loginForm.value.email, this.loginForm.value.password)
    .then(async (success) =>{
      let userID = success.user.uid;
      await this.data.set("userId", userID);
      this.handlerService.dismissLoading();
      this.handlerService.hapticsImpactMedium();
      this.router.navigate(['folder', 'Home']);
    }).catch((error) => {
      this.handlerService.dismissLoading();
      this.handlerService.hapticsImpactMedium();
    })

    

  }
}
