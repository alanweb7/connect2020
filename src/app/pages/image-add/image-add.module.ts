import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImageAddPageRoutingModule } from './image-add-routing.module';

import { ImageAddPage } from './image-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageAddPageRoutingModule
  ],
  declarations: [ImageAddPage]
})
export class ImageAddPageModule {}
