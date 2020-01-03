import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicacoesPage } from './aplicacoes.page';

const routes: Routes = [
  {
    path: '',
    component: AplicacoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicacoesPageRoutingModule {}
