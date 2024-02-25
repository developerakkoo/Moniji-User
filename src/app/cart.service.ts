import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface Product {
  _id:number;
  make:string;
  type:string;
  diameter:number;
  length:number;
  partNo: string;
  quantity:number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  data: Product[] = [

  ];

  cart:any = [];

  cartItemCount = new BehaviorSubject(0);
  constructor() { }


  getCart(){
    return this.cart;
  }


  getCartItemCount(){
    return this.cartItemCount;
  }

  addProduct(product:any, count:number){
    console.log(product);
    let added = false;

    for (let p of this.cart){
      if(p._id === product._id){
        p.quantity += count;
        added = true;
        break;
      }
    }

    if(!added){
      product.quantity = count;
      this.cart.push(product);
    }

    this.cartItemCount.next(this.cartItemCount.value + count);
    
  }

  decreaseProduct(product:any, value:number){
    for(let [index, p] of this.cart.entries()){
      if(p._id === product._id){
        p.quantity -= value;
        if(p.quantity == 0){
          this.cart.splice(index, 1);
        }
      }
    }

    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product:any){
    for(let [index, p] of this.cart.entries()){
      if(p._id === product._id){
        this.cartItemCount.next(this.cartItemCount.value  - p.quantity);
        this.cart.splice(index, 1);
      }
  
    }
  }

  clearCart(){
    this.cartItemCount.next(0);
    this.cart = [];
  }
}



