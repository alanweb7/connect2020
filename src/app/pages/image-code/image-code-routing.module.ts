import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageCodePage } from './image-code.page';

const routes: Routes = [
  {
    path: '',
    component: ImageCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageCodePageRoutingModule {}
