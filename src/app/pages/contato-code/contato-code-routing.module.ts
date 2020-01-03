import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatoCodePage } from './contato-code.page';

const routes: Routes = [
  {
    path: '',
    component: ContatoCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoCodePageRoutingModule {}
