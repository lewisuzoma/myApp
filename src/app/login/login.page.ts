import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; 

import { AuthConstants } from './../config/auth-constant';
import { AuthService } from './../services/auth.service';
import { StorageService } from './../services/storage.service';

import { ToastService } from './../services/toast.service';
import { LoaderService } from './../services/loader.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
  	email: '',
  	password: ''
  };

  constructor(
  	public loadingCtrl: LoaderService, 
  	public router: Router,
  	public authService: AuthService,
  	public storageService: StorageService,
  	private toastService: ToastService,
  	) {}

  ngOnInit() {
  }

  validateInputs() {
	let email = this.postData.email.trim();
	let password = this.postData.password.trim();
	return (
	this.postData.email &&
	this.postData.password &&
	email.length > 0 &&
	password.length > 0
	);
}

  loginNote = "Please Login";

  loginAction(){
  	//console.log(this.postData); //Return a JS Obj {email: "", password: ""}
  	//const formData = JSON.stringify(this.postData); //Return a JSON {"email": "", "password": ""}
  	 this.loadingCtrl.presentLoader('Please wait...');
  	if (this.validateInputs()) {
		this.authService.login(this.postData).subscribe((res: any) => {
	if (res.access_token) {
		// Storing the User data.
		this.storageService.store(AuthConstants.AUTH, res.access_token);
		this.router.navigate(['welcome']);
	} 
		else {
			this.toastService.presentToast('Incorrect login details.');
		}
	},
		(error: any) => {
			this.toastService.presentToast('Network Issue.');
		}

	);

	} 
	else {
		this.toastService.presentToast('Please enter email/username or password.');
	}

	this.loadingCtrl.dismissLoader();
  }


}
