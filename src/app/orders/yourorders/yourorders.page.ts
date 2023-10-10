import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { LoadingController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/data.service';
import { HandlerService } from 'src/app/handler.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-yourorders',
  templateUrl: './yourorders.page.html',
  styleUrls: ['./yourorders.page.scss'],
})
export class YourordersPage implements OnInit {

  userId!: string;
  userDBKey!: string;
  orderRef!:any;
  order:any[] = [
   
  ]

  orderSub!: Subscription;
  constructor(private firestore: Firestore,
              private auth: Auth,
              private loadingController: LoadingController,
              private data: DataService,
              private io: Socket,
              private router: Router,
              private http: HttpClient,
              private handler: HandlerService) {
                this.io.connect();

                this.io.on("get:order", (order:any) =>{
                  console.log(order);
                  console.log("get order event");
                  this.order = order;
                  
                })
               }

 async ngOnInit() {
  this.userId = await this.data.get("userId");
  console.log(`USerId ${this.userId}`);
  this.getUserOrders();
  }

  async getUserOrders(){
    this.presentLoading();
   this.orderSub = this.http.get(environment.API +`/order/user/${this.userId}`)
   .subscribe({
    next: (order:any) =>{
      console.log(order);
      this.order = order['order'];
      this.loadingController.dismiss();
    },
    error: (error) =>{
      console.log(error);
      this.loadingController.dismiss();
      
    }
   })
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  openDetail(id:any){
    console.log(id);
    this.router.navigate(['orders', id]);
    
  }
  delete(item:any){
    console.log(item);
    
  }

}
