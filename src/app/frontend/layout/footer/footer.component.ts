import { Component, OnInit } from '@angular/core';

import { SettingService } from '../../../backend/component/setting/setting.service'
// Environtment
import { environment } from 'src/environments/environment';

// Model
import { Setting } from '../../..//backend/component/setting/setting'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  image_url = environment.image_url
  prefix: String = environment.prefix

  logoFbUrl: String = null;
  logoIgUrl: String = null;
  logoTwitUrl: String = null;

  constructor(private settingService: SettingService) { }

  ngOnInit() {
    this.initSetting()
  }
  setting: Setting

    private initSetting() {
      return this.settingService.getSettingByCode("0").subscribe((data) => {
        this.setting = data

        if (data.logo_fb) {
          this.logoFbUrl = this.image_url + data.logo_fb
        }

        if (data.logo_twitter) {
          this.logoTwitUrl = this.image_url + data.logo_twitter
        }

        if (data.logo_instagram) {
          this.logoIgUrl = this.image_url + data.logo_instagram
        }

      })

    }
}
