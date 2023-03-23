import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GermanPage } from './german.page';

const routes: Routes = [
  {
    path: '',
    component: GermanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GermanPageRoutingModule {}
