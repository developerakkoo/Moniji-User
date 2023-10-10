import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    FilterPipeModule,
    IonicModule,

    FolderPageRoutingModule
  ],
  declarations: [FolderPage]
})
export class FolderPageModule {}
