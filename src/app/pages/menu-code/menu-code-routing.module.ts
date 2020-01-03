import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCodePage } from './menu-code.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCodePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCodePageRoutingModule {}
