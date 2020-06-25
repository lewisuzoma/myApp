import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router'; 

import { HttpService } from './../../services/http.service';
import { Observable, range, throwError } from 'rxjs';
import { map, filter, finalize, catchError, tap } from 'rxjs/operators';

import { LoaderService } from './../../services/loader.service';
import { ToastService } from './../../services/toast.service';
import { StorageService } from './../../services/storage.service';

import { AuthConstants } from './../../config/auth-constant';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage implements OnInit {
base_path = 'http://localhost:3000/users';
//sch_path = 'http://localhost:3000/schools';

token: any;

public userData: any = [];

public schData: any = [];

public postData = {
	cat: '',
	schlCode: '',
	reportTxt: '',
	userID: this.userData.id
	};

  constructor(
  	public loadingCtrl: LoaderService,
  	public toastService: ToastService,
  	public router: Router,
  	public storageService: StorageService,
  	public http: HttpClient
  	) { }


 getTokenAuth(){
     return this.storageService.get(AuthConstants.AUTH).then((res) => {
       this.token = res;
     });
 }


  ngOnInit() {
  	this.getTokenAuth().then(() => {
      const headers = new HttpHeaders();
      const header = headers.set('authorization', `Bearer ${this.token}`);
      this.http
      .get(this.base_path, {headers: header}).subscribe((res) => {
        this.userData.push(res);
      });
    });
  }


 fetchSchData(ev) {
 	const cde = ev.target.value;
 	this.getTokenAuth().then(() => {
 		this.http.get(`http://localhost:3000/schools?code=`+cde).subscribe((res) => {
 			this.schData.push(res);
 		});
 	});
 } 


 validateInputs() {
	let schlCode = this.postData.schlCode.trim();
	return (
	this.postData.cat &&
	this.postData.schlCode &&
	this.postData.reportTxt &&
	schlCode.length > 0 &&
	this.postData.reportTxt.length > 0
	);
 }
 

 validateRadioButton() {
 	let cat: any = this.postData.cat;
 	return cat;
 }

  sendReportAction() {
  	this.loadingCtrl.presentLoader("Please wait...");
  	if(this.validateRadioButton() === ''){
  		this.toastService.presentToast("Please fill all fields...");
  		this.loadingCtrl.dismissLoader();
  	}
  	else if (this.validateInputs()){
  		  this.getTokenAuth().then(() => {
	      const headers = new HttpHeaders();
	      const header = headers.set('authorization', `Bearer ${this.token}`);
	      this.http.post<any>('http://localhost:3000/sendReport', this.postData, {headers: header}).subscribe((res) => {
	      this.toastService.presentToast("Report Sent. Thank you for your time.");
		  this.loadingCtrl.dismissLoader();
		  this.router.navigate(['./']);
	    },
	    (error: any) => {
	    	this.toastService.presentToast("Report Sent. Thank you for your time.");
	    	this.router.navigate(['./']);
          //this.toastService.presentToast('Network Issue.');
        }

	    );

  		});
	}
	else {
		this.toastService.presentToast("Please fill all fields...");
		this.loadingCtrl.dismissLoader();
	}

	this.loadingCtrl.dismissLoader();
  }

}
