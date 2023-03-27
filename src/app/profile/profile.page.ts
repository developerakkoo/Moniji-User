import { HandlerService } from './../handler.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as  moment from 'moment';
import { DataService } from '../data.service';
import { child, Database, getDatabase, ref } from '@angular/fire/database';
import { get } from '@firebase/database';
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

  constructor(private fb: FormBuilder,
              private data: DataService,
              private db: Database,
              private handlerService: HandlerService) {
                this.profileForm = this.fb.group({
                  name:[],
                  email:[],
                  password:[],
                  address:[],
                  gst:[],
                  company:[],
                  mobile:[],
                  city:[],
                })
               }

              
  onSubmit(){
    
  }

  async ngOnInit() {
    this.userDbKey = await this.data.get("userKey");
    this.userId = await this.data.get("userId");
    console.log(`USer Database ref key ${this.userDbKey}`);
    console.log(moment().format("YYYY/MM/DD"));
    this.todaysDate = moment().format("YYYY/MM/DD");
    this.getUserDetails();
    
      
  }


  async getUserDetails(){
    const dbRef = ref(getDatabase());

    get(child(dbRef, `Users/${this.userDbKey}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        this.userObj = snapshot.val();

        this.profileForm.get("address")?.setValue(this.userObj['address']);
        this.profileForm.get("name")?.setValue(this.userObj['name']);
        this.profileForm.get("email")?.setValue(this.userObj['email']);
        this.profileForm.get("gst")?.setValue(this.userObj['gst']);
        this.profileForm.get("company")?.setValue(this.userObj['company']);
        this.profileForm.get("city")?.setValue(this.userObj['city']);
        this.profileForm.get("mobile")?.setValue(this.userObj['mobile']);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

}
