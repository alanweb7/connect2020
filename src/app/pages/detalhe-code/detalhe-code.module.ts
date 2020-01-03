import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalheCodePageRoutingModule } from './detalhe-code-routing.module';

import { DetalheCodePage } from './detalhe-code.page';

import { MidiasPage } from "../midias/midias.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalheCodePageRoutingModule
  ],
  declarations: [
    DetalheCodePage,
    MidiasPage
  ],
  entryComponents:[
    MidiasPage
  ]
})
export class DetalheCodePageModule {}
