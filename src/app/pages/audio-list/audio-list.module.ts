import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioListPageRoutingModule } from './audio-list-routing.module';

import { AudioListPage } from './audio-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioListPageRoutingModule
  ],
  declarations: [AudioListPage]
})
export class AudioListPageModule {}
