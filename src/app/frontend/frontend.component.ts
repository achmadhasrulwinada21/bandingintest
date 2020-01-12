import { Component, OnInit } from '@angular/core';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { MenuService } from '../backend/component/menu/menu.service'

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {

  faCartPlus = faCartPlus;
       
  constructor( private menuService: MenuService) { 
   
  }

   ngOnInit() {
     this.getListMenu()
  }

  menu_name : String = null
  ListMenu = []

  public getListMenu(){
    this.menuService.getAll().subscribe((data) =>{
      this.ListMenu = data
    })
  }

}
