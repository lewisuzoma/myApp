import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SlidesComponent } from './slides/slides.component';
import { LogoComponent } from './logo/logo.component';
import { StartComponent } from './start/start.component';
import { FabComponent } from './fab/fab.component';
import { BackbuttonComponent } from './backbutton/backbutton.component';



@NgModule({
  declarations: [SlidesComponent, LogoComponent, StartComponent, FabComponent, BackbuttonComponent],
  exports: [SlidesComponent, LogoComponent, StartComponent, FabComponent, BackbuttonComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
