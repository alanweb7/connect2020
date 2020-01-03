import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificacaoPushPageRoutingModule } from './notificacao-push-routing.module';

import { NotificacaoPushPage } from './notificacao-push.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificacaoPushPageRoutingModule
  ],
  declarations: [NotificacaoPushPage]
})
export class NotificacaoPushPageModule {}
