import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChinaPage } from './china.page';

const routes: Routes = [
  {
    path: '',
    component: ChinaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChinaPageRoutingModule {}
