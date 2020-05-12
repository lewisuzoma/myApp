import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './../components/components.module';
import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { MustMatchDirective } from './../directive/must-match.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage, MustMatchDirective]
})
export class SignupPageModule {}
