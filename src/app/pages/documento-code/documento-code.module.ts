import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentoCodePageRoutingModule } from './documento-code-routing.module';

import { DocumentoCodePage } from './documento-code.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentoCodePageRoutingModule
  ],
  declarations: [DocumentoCodePage]
})
export class DocumentoCodePageModule {}
