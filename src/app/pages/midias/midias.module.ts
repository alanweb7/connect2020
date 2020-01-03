import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MidiasPageRoutingModule } from './midias-routing.module';

import { MidiasPage } from './midias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MidiasPageRoutingModule
  ],
  declarations: [MidiasPage]
})
export class MidiasPageModule {}
