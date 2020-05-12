import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public loadingCtrl: LoadingController) { }

   async presentLoader(loaderMessage: string) {
	    let loading = await this.loadingCtrl.create({
	      spinner: 'dots',
	      message:  loaderMessage
	    });

	  	await loading.present();

	 
	  	/*const { role, data } = await loading.onDidDismiss();
    	this.router.navigate(['welcome']);*/

	  	/**
	  	* setTimeout(() => {
	  	*	loading.dismiss();
		*   this.router.navigate(['welcome']);
		* }, 1000);
		*/
	//}
	}

	async dismissLoader() {
		let dismiss = await setTimeout(() => {
			this.loadingCtrl.dismiss();
		}, 2000);

	}

}
