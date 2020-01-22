import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../../backend/component/menu/menu.service'
import { SettingService } from '../../../backend/component/setting/setting.service'

import { Setting } from '../../../backend/component/setting/setting'

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  prefix: String = environment.prefix

  constructor(private menuService: MenuService,
              private settingService: SettingService) { }

  ngOnInit() {

    this.getListMenu()
    this.initSetting()
  }

  menu_name: String = null
  ListMenu = []
  setting: Setting

    public getListMenu() {
      this.menuService.getAll().subscribe((data) => {
        this.ListMenu = data
      })
    }

  private initSetting() {
    return this.settingService.getSettingByCode("0").subscribe((data) => {
      this.setting = data
    })
  }

}
