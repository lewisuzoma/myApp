import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from './../components/components.module';
import { SignupPageRoutingModule } from './signup-routing.module';

import { SignupPage } from './signup.page';
import { MustMatchDirective } from './../directive/must-match.directive';
import { EmailExistDirective } from './../directive/email-exist.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    SignupPageRoutingModule
  ],
  declarations: [SignupPage, MustMatchDirective, EmailExistDirective]
})
export class SignupPageModule {}
