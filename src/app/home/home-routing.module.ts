import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

//import { IndexGuard } from './../guards/index.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    //canActivate: [IndexGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
