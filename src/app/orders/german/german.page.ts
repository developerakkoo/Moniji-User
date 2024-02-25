import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IonSelectCustomEvent } from '@ionic/core';
import { Database } from '@angular/fire/database';
import { DataService } from 'src/app/data.service';
import { AlertController } from '@ionic/angular';
import { increment, ref, set } from '@firebase/database';
import * as  moment from 'moment';
import { collection, Firestore } from '@angular/fire/firestore';
import { addDoc, doc, setDoc } from '@firebase/firestore';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HandlerService } from 'src/app/handler.service';
@Component({
  selector: 'app-german',
  templateUrl: './german.page.html',
  styleUrls: ['./german.page.scss'],
})
export class GermanPage implements OnInit {

  orderForm: FormGroup;
  type:string = "ground";
  diameter:number = 3;
  todaysDate: any;
  diameterArray:number[] = [
    3,
    4,
    5,
    6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
    21,22,23,24,25,26,27,28,29,30,31,32,33,34,
    35,36,37,38,39,40
  ];
  lengthArray: number[] = [
    50,55,60,65,70,75,80,85,90,95,100, 
    115,120,125,130,135,140,145,150,
    155,160,165,170,175,180,185,190,195,
    200,205,210,215,220,225,230,235,240,
    245,250,255,260,265,270,275,280,285,290,295,300,
    305,310,315,320,325,330
  ];
  length:number = 50;

  userId!:string;
  isLengthButtonActive:boolean = false;

  gerSub!: Subscription;
  constructor(private fb: FormBuilder,
              private db: Database,
              private firstore: Firestore,
              private data: DataService,
              private http: HttpClient,
              private handler: HandlerService,
              private alertController: AlertController) {
    this.orderForm = this.fb.group({
      type: [, [Validators.required]],
      diameter: [,[Validators.required]],
      length: [, [Validators.required]],
      quantity: [, [Validators.required]],
    })
   }

 async ngOnInit() {
  this.userId = await this.data.get("userId");
  console.log(moment().format("YYYY/MM/DD"));
  this.todaysDate = moment().format("YYYY/MM/DD");
  
    
}

  onSubmit(){
    console.log(this.orderForm.value);
    this.presentAlertConfirm("Confirm", "", "Do you want to place the order", "Yes");
  }
  reset(){
    this.orderForm.reset();
  }
  async presentAlertConfirm(header: string, handler:any, msg: string, buttonText: string) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: buttonText,
          handler: () =>{
            console.log("Yes");
            let obj = {
              userId: this.userId,
              type: this.orderForm.value.type,
              diameter: this.orderForm.value.diameter,
              length: this.orderForm.value.length,
              quantity: this.orderForm.value.quantity,
              status: 1,
              make: "German"

            }
            this.handler.presentLoading("Placing order...");

           console.log(obj);
           this.gerSub = this.http.post(environment.API + `/order`, obj)
           .subscribe({
            next: (order:any) =>{
              console.log(order);
              this.handler.dismissLoading();
              this.handler.hapticsImpactLight();
              this.handler.presentAlert("Success", "", "Your order is succesfully placed.", "Okay");
              
            },
            error: (error) =>{
              console.log(error);
              this.handler.dismissLoading();
              this.handler.hapticsImpactLight();
              this.handler.presentAlert("Error", "", "Please try again!", "Okay");
              
            }
           })

            
          }
        }
      ]
    });
  
    await alert.present();
  }
 
  typeEvent(ev: any){
    console.log(ev.detail.value);
    let type = ev.detail.value;
    if(type == "ground"){
      console.log("Type ground");
      // this.isLengthButtonActive = false;
      
    }
    else if(type == "unground"){
      console.log("Type unground set length to 330");
      // this.length = 330;
      // this.isLengthButtonActive = true;
      
    }

    
  }

  diameterEvent(ev: any){
    let diameter = ev.detail.value;
    console.log(diameter);
    this.diameter = diameter;
  }

  lengthEvent(ev: any){
    let length = ev.detail.value;
    console.log(length);
    this.length = length;
    
  }


}
