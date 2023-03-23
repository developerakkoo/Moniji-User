import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourordersPage } from './yourorders.page';

const routes: Routes = [
  {
    path: '',
    component: YourordersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YourordersPageRoutingModule {}
