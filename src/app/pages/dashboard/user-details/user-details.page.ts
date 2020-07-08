import { Component, OnInit } from '@angular/core';
import { DetailsService } from './../../../services/details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {

public user;

  constructor(private route: ActivatedRoute, public detailServices: DetailsService) { }

  ngOnInit() {
  	let id = this.route.snapshot.paramMap.get('uid');
  	this.user =  this.detailServices.getUsers(id);
  }

}
