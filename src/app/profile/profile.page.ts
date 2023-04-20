import { HandlerService } from './../handler.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as  moment from 'moment';
import { DataService } from '../data.service';
import { child, Database, getDatabase, ref } from '@angular/fire/database';
import { get } from '@firebase/database';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm!: FormGroup;

  userDbKey!:string;
  userId!:string;
  todaysDate!:any;

  userObj!:any;

  getUserSub!: Subscription;
  updateUserSub!: Subscription;

  constructor(private fb: FormBuilder,
              private data: DataService,
              private db: Database,
              private http: HttpClient,
              private handlerService: HandlerService) {
                this.profileForm = this.fb.group({
                  name:[],
                  email:[],
                  address:[],
                  gst:[],
                  company:[],
                  mobile:[],
                  city:[],
                })
               }

              
  onSubmit(){
    this.handlerService.presentLoading("Updating user...")
    this.updateUserSub = this.http.put(environment.API + `/user/${this.userId}`, {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
      address: this.profileForm.value.address,
      gst: this.profileForm.value.gst,
      company: this.profileForm.value.company,
      mobileno: this.profileForm.value.mobile,
      city: this.profileForm.value.city
    }).subscribe({
      next:(user) =>{
        console.log(user);
        this.handlerService.dismissLoading();

      },
      error: (error) =>{
        console.log(error);
        this.handlerService.dismissLoading();
        
      }
    })
  }

  async ngOnInit() {
    this.userId = await this.data.get("userId");
    console.log(moment().format("YYYY/MM/DD"));
    this.todaysDate = moment().format("YYYY/MM/DD");
    this.getUserDetails();
    
      
  }

  IonViewDidLeave(){
    this.getUserSub.unsubscribe();
    this.updateUserSub.unsubscribe();

  }

  async getUserDetails(){
    this.handlerService.presentLoading("Getting user profile...");
    this.getUserSub =  this.http.get(environment.API + `/user/${this.userId}`).subscribe({
      next:(user:any) =>{
        this.handlerService.dismissLoading();
        console.log(user);
        this.profileForm.setValue({
          email: user['user']['email'],
          name: user['user']['name'],
          address: user['user']['address'],
          gst: user['user']['gst'],
          company: user['user']['company'],
          mobile: user['user']['mobileno'],
          city: user['user']['city']
        })
      },

      error: (error) =>{
        console.log(error);
        this.handlerService.dismissLoading();
        
      }
    })
   
  }

}
