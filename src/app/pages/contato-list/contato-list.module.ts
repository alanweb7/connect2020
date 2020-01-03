import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContatoListPageRoutingModule } from './contato-list-routing.module';

import { ContatoListPage } from './contato-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatoListPageRoutingModule
  ],
  declarations: [ContatoListPage]
})
export class ContatoListPageModule {}
