import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusCodesPage } from './meus-codes.page';

const routes: Routes = [
  {
    path: '',
    component: MeusCodesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeusCodesPageRoutingModule {}
