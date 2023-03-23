import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GermanPageRoutingModule } from './german-routing.module';

import { GermanPage } from './german.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    GermanPageRoutingModule
  ],
  declarations: [GermanPage]
})
export class GermanPageModule {}
