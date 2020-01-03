import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContatoListPage } from './contato-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContatoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoListPageRoutingModule {}
