import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { environment } from 'src/environments/environment';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {HandlerService} from './../handler.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  userId!: string;
  items: any[] = [];
  constructor(
    private cartService: CartService,
    private http: HttpClient,
    private handler: HandlerService,
    private loadingController: LoadingController,
    private data: DataService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userId = await this.data.get('userId');
    this.items = this.cartService.getCart();
    console.log(this.items);
    console.log(this.userId);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Placing Order...',
    });
    await loading.present();
  }

  decreaseCartItem(product: any) {
    if (product.amount == 1) {
      return;
    }

    this.cartService.decreaseProduct(product, 1);
  }

  increaseCartItem(product: any) {
    this.cartService.addProduct(product, 1);
  }

  removeCartItem(product: any) {
    this.cartService.removeProduct(product);
  }

  addSubOrders(orderID: any) {
    this.presentLoading();
    let obj = {
      insert: true,
      Products: this.items,
    };

    this.http
      .put(environment.API + '/add/productToOrder/' + orderID, obj)
      .subscribe({
        next: (value: any) => {
          console.log(value);
          this.loadingController.dismiss();
          this.router.navigate(['yourorders']);
        },
        error: (error) => {
          console.log(error.error);
          this.loadingController.dismiss();
        },
      });
  }
  placeOrder() {
    this.presentLoading();
    console.log(this.items);

    let obj = {
      userId: this.userId,
      message: 'Order Placed',
      status: 1,
    };

    this.http.post(environment.API + '/order', obj).subscribe({
      next: (placed: any) => {
        console.log(placed);
        this.loadingController.dismiss();
        this.addSubOrders(placed['order']['_id']);
      },
      error: (error) => {
        console.log(error.error.message);
        this.loadingController.dismiss();
      },
    });
  }
}
