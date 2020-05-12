import { AuthConstants } from './../config/auth-constant';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { HttpService } from './http.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
  	private httpService: HttpService, 
  	private storageService: StorageService,
  	private router: Router
  	) { }

  login(postData: any): Observable<any> {
  	return this.httpService.post('login', postData);
  }

  signup(postData: any): Observable<any> {
  	return this.httpService.post('signup', postData);
  }

  logout() {
  	this.storageService.removeItem(AuthConstants.AUTH).then(res =>{
  	this.router.navigate(['/login']);
  		});
  	}


}
