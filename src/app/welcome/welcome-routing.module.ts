import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomePage } from './welcome.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: WelcomePage,
    children: [
	  {
	    path: 'dashboard',
	    children: [
		    {
		    	path: '',
		    	loadChildren: () => import('./../pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
		    },
		    {
		    	path: 'user-details/:uid',
		    	loadChildren: () => import('./../pages/dashboard/user-details/user-details.module').then( m => m.UserDetailsPageModule)
		    },
	    ]
	  },
	  {
	    path: 'send',
	    loadChildren: () => import('./../pages/send/send.module').then( m => m.SendPageModule)
	  },
	  {
	    path: 'settings',
	    loadChildren: () => import('./../pages/settings/settings.module').then( m => m.SettingsPageModule)
	  },
	  {
	    path: 'logout',
	    loadChildren: () => import('./../pages/logout/logout.module').then( m => m.LogoutPageModule)
	  },
	  /*{
	  	path: 'user-details/:id',
        loadChildren: () => import('./../pages/dashboard/user-details/user-details.module').then( m => m.UserDetailsPageModule)
      },*/

    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomePageRoutingModule {}
