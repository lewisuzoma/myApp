import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { AuthConstants } from './../config/auth-constant';

import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor  } from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
	  // API path
  base_path = 'http://localhost:3000/users';
  token: any;

  constructor(public storageService: StorageService, public http: HttpClient) { }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  getTokenAuth(){
     return this.storageService.get(AuthConstants.AUTH).then((res) => {
       this.token = res;
     });
  } 

   // Get user data
   getUserData() {
    this.getTokenAuth().then(() => {
      const headers = new HttpHeaders();
      const header = headers.set('authorization', `Bearer ${this.token}`);
      return this.http
      .get(this.base_path, {headers: header}).subscribe((res) => {
        //this.userData = res;
        //console.log(this.userData);
      });
    });
  }
 /* 
 getUserData(): Observable<User> {
  	this.getTokenAuth().subscribe(res => {
  		this.token = res
  		console.log(this.token);
  		
  	});
  	console.log(this.token);
  	const headers = new HttpHeaders();
  	const header = headers.set('authorization', `Bearer ` + this.token);
    return this.http
      .get<User>(this.base_path, {headers: header})
      .pipe(
        retry(0),
        catchError(this.handleError)
      )
  } 

  */

}

