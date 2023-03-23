import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YourordersPageRoutingModule } from './yourorders-routing.module';

import { YourordersPage } from './yourorders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YourordersPageRoutingModule
  ],
  declarations: [YourordersPage]
})
export class YourordersPageModule {}
