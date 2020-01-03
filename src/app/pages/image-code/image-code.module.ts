import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageCodePageRoutingModule } from './image-code-routing.module';

import { ImageCodePage } from './image-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageCodePageRoutingModule
  ],
  declarations: [ImageCodePage]
})
export class ImageCodePageModule {}
