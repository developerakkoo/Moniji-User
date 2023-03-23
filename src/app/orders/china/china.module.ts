import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChinaPageRoutingModule } from './china-routing.module';

import { ChinaPage } from './china.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChinaPageRoutingModule
  ],
  declarations: [ChinaPage]
})
export class ChinaPageModule {}
