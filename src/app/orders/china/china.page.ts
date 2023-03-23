import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-china',
  templateUrl: './china.page.html',
  styleUrls: ['./china.page.scss'],
})
export class ChinaPage implements OnInit {

  orderForm: FormGroup;
  type:string = "ground";
  diameter:number = 3;
  itemArray:string[] =[
    'Solid',
    'Single Hole',
    '2 Straight Hole',
    '2 Helical Hole',
    '3 Helical Hole',
    'Technicut'
  ]
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
  isSmallDiaButtonActive:boolean = false;
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      item:[],
      smallDia:[],
      type: [, [Validators.required]],
      diameter: [,[Validators.required]],
      length: [, [Validators.required]],
      quantity: [, [Validators.required]]
    })
   }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.orderForm.value);
    
  }
  reset(){
    this.orderForm.reset();
  }
 
  itemEvent(ev:any){
    console.log(ev.detail.value);
    let item = ev.detail.value;
    if(item == "2 Straight Hole"){
      this.isSmallDiaButtonActive = true;
    }
    else  if(item == "2 Helical Hole"){
      this.isSmallDiaButtonActive = true;
    }
      else{
      this.isSmallDiaButtonActive = false;

      }
  }
  
  typeEvent(ev: any){
    console.log(ev.detail.value);
    let type = ev.detail.value;
    if(type == "ground"){
      console.log("Type ground");
      
    }
    else if(type == "unground"){
      console.log("Type unground set length to 330");
      
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
