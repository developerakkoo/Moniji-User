import { HandlerService } from './../handler.service';
import { DataService } from './../data/data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private data: DataService,
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

  ngOnInit() {
  }

  onSubmit(){
    
  }

}
