import { Component, OnInit } from '@angular/core';
import { DetailsService } from './../../services/details.service';
import { ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { ChartDataSets } from 'chart.js';
import {Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

// Data
  chartData: ChartDataSets[] = [{ data: [], label: 'Crypto price' }];
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
 
  constructor(
  	private route: ActivatedRoute, 
  	public detailServices: DetailsService, 
  	private http: HttpClient
  	) { }
 
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


  ngOnInit() {
  	//let id = this.route.snapshot.paramMap.get('id');
  	//console.log(this.detailServices.getUsers(id));
  }
  

}
