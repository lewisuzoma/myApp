import { Component, OnInit } from '@angular/core';
import { AuthConstants } from './../config/auth-constant';
import { StorageService } from './../services/storage.service';

import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }
  logout(){
  	 this.authService.logout();
  }
 
}
