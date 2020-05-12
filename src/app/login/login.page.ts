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
  	emailphone: '',
  	pwd: ''
  };

  constructor(
  	public loadingCtrl: LoaderService, 
  	public router: Router,
  	public authService: AuthService,
  	public storageService: StorageService,
  	private toastService: ToastService
  	) {}

  ngOnInit() {
  }

  validateInputs() {
	let emailphone = this.postData.emailphone.trim();
	let pwd = this.postData.pwd.trim();
	return (
	this.postData.emailphone &&
	this.postData.pwd &&
	emailphone.length > 0 &&
	pwd.length > 0
	);
}

  loginNote = "Please Login";

  loginAction(){
  	 this.loadingCtrl.presentLoader('Please wait...');
  	if (this.validateInputs()) {
		this.authService.login(this.postData).subscribe((res: any) => {
	if (res.userData) {
		// Storing the User data.
		this.storageService.store(AuthConstants.AUTH, res.userData);
		this.router.navigate(['welcome']);
	} 
		else {
			this.toastService.presentToast('incorrect password.');
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
  }


}
