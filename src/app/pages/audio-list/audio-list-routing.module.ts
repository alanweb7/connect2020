import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioListPage } from './audio-list.page';

const routes: Routes = [
  {
    path: '',
    component: AudioListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioListPageRoutingModule {}
