import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImageAddPage } from './image-add.page';

const routes: Routes = [
  {
    path: '',
    component: ImageAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageAddPageRoutingModule {}
