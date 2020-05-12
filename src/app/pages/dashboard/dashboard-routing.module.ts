import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: DashboardPage
    /*children: [
      {
        path: 'user-details/:uid',
        loadChildren: () => import('./user-details/user-details.module').then( m => m.UserDetailsPageModule)
      },
      
    ]*/
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
