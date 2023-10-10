import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { environment } from 'src/environments/environment';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder!: string;

  productFilter: any = { PartNo: '' };
  product:any[] = [
  ]
  carts = [];

  cart = [];
  cartItemCount!: BehaviorSubject<number>;
  getProductSub!:Subscription;

  currentPAge:number = 0;
  totalPage:number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private loadingController: LoadingController,
    private http: HttpClient,
              private router: Router) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    console.log(this.cart);
    
    this.getAllProducts();
  }
  ionViewDidEnter(){
    console.log("Entered");
    
  }

  ionViewDidLeave(){
    // this.getProductSub.unsubscribe();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });
    await loading.present();
  }
  getAllProducts(){
    this.presentLoading();
    this.http.get(environment.API +`/getAll/product?page=1`).subscribe({
      next:(p:any) =>{
        console.log(p);
        this.product = p['savedProduct'];
        this.currentPAge = p['page'];
        this.totalPage = p['total'];
        this.loadingController.dismiss();
      },
      error:(error) =>{
        console.log(error);
        this.loadingController.dismiss();
        
      }
    })
  }


  addToCart(product:any,amount:any){
    this.cartService.addProduct(product, parseInt(amount));
    console.log(this.cart); 
  }

  openCart(){
    this.router.navigate(['cart']);
  }

  loadData(ev:any){
    console.log(ev);
  
  this.currentPAge = this.currentPAge + 1;


      setTimeout(() =>{
        // ev.complete();
        console.log(`Current Page is ${this.currentPAge}`);
        console.log(`total Page is ${this.totalPage}`);
        
        this.http.get(environment.API +`/getAll/product?page=${this.currentPAge}`).subscribe({
          next:(p:any) =>{
            console.log(p);
            this.product = p['savedProduct'];
            this.currentPAge = p['page'];
            this.totalPage = p['total'];
            
            // for(let i = 0; i < this.product.length; i++){
            //   this.product.push(this.product[i]);
            // }
          },
          error:(error) =>{
            console.log(error);
            
          }
        })

        console.log("Async opertion ended");
        (ev as InfiniteScrollCustomEvent).target.complete();
      },1000)
    
  }
  makeSelectHandler(make:string){
    console.log(make);
    if(make == 'china'){
      this.router.navigate(['china'])

    }
    else if(make == 'german'){
      this.router.navigate(['german'])

    }
  }
}
