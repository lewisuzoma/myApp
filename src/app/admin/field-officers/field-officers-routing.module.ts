import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FieldOfficersPage } from './field-officers.page';

const routes: Routes = [
  {
    path: '',
    component: FieldOfficersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldOfficersPageRoutingModule {}
