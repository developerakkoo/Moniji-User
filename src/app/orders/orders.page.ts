import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  orderId:any;
  order:any[] = [];
  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private loadingController: LoadingController) { 
                this.orderId = this.route.snapshot.paramMap.get("id");
                this.getOrderById();
              }

  ngOnInit() {
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }

  getOrderById(){
    this.presentLoading();
    this.http.get(environment.API + '/order/'+ this.orderId)
    .subscribe({
      next:(value:any) =>{
        console.log(value);
        this.order = value['order']['OrderedProducts']
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();

        
      }
    })
  }
}
