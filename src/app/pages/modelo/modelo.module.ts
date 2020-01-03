import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModeloPageRoutingModule } from './modelo-routing.module';

import { ModeloPage } from './modelo.page';
import { MidiasPage } from '../midias/midias.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModeloPageRoutingModule
  ],
  declarations: [
    ModeloPage,
    MidiasPage
  ],
  entryComponents:[
    MidiasPage
  ]
})
export class ModeloPageModule {}
