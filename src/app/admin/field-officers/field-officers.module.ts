import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FieldOfficersPageRoutingModule } from './field-officers-routing.module';

import { FieldOfficersPage } from './field-officers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FieldOfficersPageRoutingModule
  ],
  declarations: [FieldOfficersPage]
})
export class FieldOfficersPageModule {}
