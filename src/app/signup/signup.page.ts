import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router'; 

//import { AuthConstants } from './../config/auth-constant';
//import { AuthService } from './../services/auth.service';
//import { StorageService } from './../services/storage.service';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from './../services/toast.service';
import { LoaderService } from './../services/loader.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

Bob: Boolean = false; // Testing *ngIf Structural Directive
names: any; // Initializing $names
days = 'Friday'; // Testing *ngSwitch Structural Directive

/*########################################################*/
users: any = [];

public postData = {
	fullname: '',
	email: '',
	phone: '',
	pwd: '',
	cpwd: '',
	acceptTerms: false
	};

//public down: boolean = false;

  constructor(public loadingCtrl: LoaderService, 
  	public router: Router,
  	public http: HttpClient,
  	//public authService: AuthService,
  	//public storageService: StorageService,
  	private toastService: ToastService

  	) {
  		this.names = ['Bob', 'Lewis', 'Uzoma']; // Testing *ngFor Structural Directive

  		/*########################################################
  		* Snippet testing for Component and Template Interaction
  		* <h1> Property Binding </h1>
  		* <h1> Event Binding </h1>
  		* <h1> Interpolation </h1>
  		* <h1> Two-way data binding [(ngModel)] => used in form inputs</h1>
  		########################################################*/
  		this.users = [
  			{id: "1", name: "Bob", picture: "http://placehold.it/75", title: "Tech Guy", hideImage: true},
  			{id: "2", name: "Lewis", picture: "http://placehold.it/75", title: "Git Guy", hideImage: false},
  			{id: "3", name: "Uzoma", picture: "http://placehold.it/75", title: "Web Guy", hideImage: false}
  		];
  	 }

  ionViewDidLeave() {
  	//this.loadingCtrl.dismissLoader();
  }

  ngOnInit() {

  }

  signupNote = 'Please, Fill the fields below!';

validateInputs() {
	let fullname = this.postData.fullname.trim();
	let email = this.postData.email.trim();
	let phone = this.postData.phone.trim();
	let pwd = this.postData.pwd.trim();
	return (
	this.postData.fullname &&
	this.postData.email &&
	this.postData.phone &&
	this.postData.pwd &&
	fullname.length > 0 &&
	phone.length > 0 &&
	pwd.length > 0
	);
}

validateAcceptTerms() {
	let acceptTerms: any = (this.postData.acceptTerms);
	return acceptTerms;
}

signupAction() {
	this.loadingCtrl.presentLoader("Please wait...");
	if (this.validateAcceptTerms() === false){
		console.log(this.validateAcceptTerms());
		this.toastService.presentToast("Please accept the terms and conditions");
	}
	else {
		if (this.validateInputs()) {
		this.http.post<any>(`http://localhost:3000/users`,this.postData).subscribe((res: any) => {
			console.log(res.email);
			this.toastService.presentToast("Account created!");
			this.loadingCtrl.dismissLoader();
			this.router.navigate(['login']);

		},
		(error: any) => {
          this.toastService.presentToast('Network Issue.');
        }

		);
		
		//this.toastService.presentToast('Please enter email, username or password.');
		}
		else {
			this.toastService.presentToast("Please enter fullname, email, phone, password");
			this.loadingCtrl.dismissLoader();
		}
	}
	

	this.loadingCtrl.dismissLoader();

	}

}