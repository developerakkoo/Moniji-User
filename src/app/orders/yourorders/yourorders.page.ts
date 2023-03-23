import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yourorders',
  templateUrl: './yourorders.page.html',
  styleUrls: ['./yourorders.page.scss'],
})
export class YourordersPage implements OnInit {

  order:any[] = [
    {
      orderId:1111,
      image:"https://www.shutterstock.com/image-illustration/metal-rod-600w-321062312.jpg",
      title: "German made",
      price:12000,
      status:"pending"
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  delete(){
    
  }

}
