import { Component, OnInit } from '@angular/core';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {

  faCartPlus = faCartPlus;
  
  constructor() { }

  ngOnInit() {
  }

}
