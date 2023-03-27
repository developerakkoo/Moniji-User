import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { LoadingController } from '@ionic/angular';
import { DataService } from 'src/app/data.service';
import { HandlerService } from 'src/app/handler.service';

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
  constructor(private firestore: Firestore,
              private auth: Auth,
              private loadingController: LoadingController,
              private data: DataService,
              private handler: HandlerService) {
                this.orderRef = collection(this.firestore, "Orders");
               }

 async ngOnInit() {
  this.userId = await this.data.get("userId");
  this.userDBKey = await this.data.get("userKey");
  console.log(`USerId ${this.userId}`);
  console.log(`User DB key ${this.userDBKey}`);
  this.getUserOrders();
  }

  async getUserOrders(){
    const q = query(this.orderRef, where("userId", "==", this.userId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.order.push(doc.data())
     
    });
  }
  delete(item:any){
    console.log(item);
    
  }

}
