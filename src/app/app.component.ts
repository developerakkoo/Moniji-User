import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/folder/Home', icon: 'home' },
    // { title: 'Order', url: 'orders', icon: 'cart' },
    { title: 'Orders', url: 'yourorders', icon: 'cube' },
    { title: 'Profile', url: 'profile', icon: 'person' },
    // { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    // { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,
              private auth: Auth) {
                console.log(this.auth.currentUser?.uid);
                
              }

  logout(){
    
    this.router.navigate(['login'])
  }
}
