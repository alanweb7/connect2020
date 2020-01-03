import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContatoCodePageRoutingModule } from './contato-code-routing.module';

import { ContatoCodePage } from './contato-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContatoCodePageRoutingModule
  ],
  declarations: [ContatoCodePage]
})
export class ContatoCodePageModule {}
