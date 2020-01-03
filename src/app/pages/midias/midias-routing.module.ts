import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MidiasPage } from './midias.page';

const routes: Routes = [
  {
    path: '',
    component: MidiasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MidiasPageRoutingModule {}
