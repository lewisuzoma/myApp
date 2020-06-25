import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  post(serviceName: String, data: any) {

  	const headers = new HttpHeaders();
  	const header = headers.set('Content-Type', 'application/json; charset=utf-8');
  	const options = { headers: header, withCredentials: false};
  	const url = environment.apiUrl +  serviceName;

  	return this.http.post(url, data);

  }

}
