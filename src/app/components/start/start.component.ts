import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {

  constructor(public router: Router, navctrl: NavController) { }

  signup() {
  	this.router.navigate(['signup']);
  }

  ngOnInit() {}

}
