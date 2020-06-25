import { Component, OnInit } from '@angular/core';
import { DetailsService } from './../../services/details.service';
import { ActivatedRoute } from '@angular/router';

import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor} from '@angular/common/http';
import { ChartDataSets } from 'chart.js';
import {Color, Label } from 'ng2-charts';

import { ApiService } from './../../services/api.service';
import { Observable, throwError, from } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { StorageService } from './../../services/storage.service';
import { AuthConstants } from './../../config/auth-constant';

/*export class User {
   id: number;
   fullname: string;
   email: string;
   phone: string;
   role: string;
}*/

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

 base_path = 'http://localhost:3000/users';
  token: any;
// Data
  chartData: ChartDataSets[] = [{ data: [], label: 'Chart' }];
  chartLabels: Label[];
 
  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic crypto price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#42d77d',
      backgroundColor: '#dedede'
    }
  ];
  chartType = 'line';
  showLegend = false;
 
  // For search
  stock = '';
 
 public userData: any = [];

 public schlData: any = [];

  constructor(
  	private route: ActivatedRoute, 
  	public detailServices: DetailsService, 
  	private http: HttpClient,
    public apiService: ApiService,
    public storageService: StorageService
  	) { 

    }
 
  getData() {
      this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/crypto/${this.stock}?from=2020-01-01`).subscribe(res => {
      	/*this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/crypto/${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {*/
      const history = res['historical'];
 		
      this.chartLabels = [];
      this.chartData[0].data = [];
 
      for (let entry of history) {
        this.chartLabels.push(entry.date);
        this.chartData[0].data.push(entry['close']);
      }
    });
  }
 
  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }

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
    //this.userData = this.apiService.getUserData();
    //console.log(this.userData);
    //let id = this.route.snapshot.paramMap.get('id');
  	//console.log(this.detailServices.getUsers(id));
    this.getUserReports().subscribe((res) => {
      console.log(res);
       this.schlData.push(res);
     }); 
  }

   // Get user data
  getUserReports() {
     return this.http.get('http://localhost:3000/school-list')
  }


}
