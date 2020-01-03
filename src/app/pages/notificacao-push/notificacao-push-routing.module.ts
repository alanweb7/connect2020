import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificacaoPushPage } from './notificacao-push.page';

const routes: Routes = [
  {
    path: '',
    component: NotificacaoPushPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificacaoPushPageRoutingModule {}
