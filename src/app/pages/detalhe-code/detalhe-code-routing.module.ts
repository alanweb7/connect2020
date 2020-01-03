import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalheCodePage } from './detalhe-code.page';

const routes: Routes = [
  {
    path: '',
    component: DetalheCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalheCodePageRoutingModule {}
