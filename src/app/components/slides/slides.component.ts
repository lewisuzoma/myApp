import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss'],
})
export class SlidesComponent implements OnInit {
	slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };

  constructor(public router: Router) { }

  ngOnInit() {}

}
