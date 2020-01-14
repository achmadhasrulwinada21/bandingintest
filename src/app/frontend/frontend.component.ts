import { Component, OnInit } from '@angular/core';

import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

//service

import { MenuService } from '../backend/component/menu/menu.service' 
import { SettingService } from '../backend/component/setting/setting.service'
import { BannerService } from '../backend/component/banner/banner.service'
import { ProductService } from '../backend/component/product/product.service'
// Environtment
import { environment } from 'src/environments/environment';

// Model
import { Setting }     from '../backend/component/setting/setting'
import { Banner }      from '../backend/component/banner/banner'
import { Product }             from '../backend/component/product/product'

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
  styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {


  faCartPlus = faCartPlus;
  image_url                   = environment.image_url
  prefix             : String = environment.prefix

  logoFbUrl          : String = null; 
  logoIgUrl          : String = null;
  logoTwitUrl        : String = null;
  bannerUrl          : String = null;
  constructor( private menuService: MenuService,
               private settingService: SettingService,
               private bannerService: BannerService,
               private productService: ProductService ){ 
   
  }

   ngOnInit() {
     this.getListMenu()
     this.initSetting()
     this.initBanner()
     this.initProduct()
  }

  menu_name : String = null
  ListMenu = []
  setting: Setting
  banner:  Banner
  Listproduct: Product


  public getListMenu(){
    this.menuService.getAll().subscribe((data) => {
      this.ListMenu = data
    })
  }

    private initProduct(){
       return this.productService.getAll().subscribe((data) => {
          this.Listproduct = data
       })
    }

    private initBanner(){
      this.bannerService.getAll().subscribe((data_banner) => {
          console.log(data_banner[0].id)
        return this.bannerService.getBannerById(data_banner[0].id).subscribe((data) => {
            this.banner = data
            if(data.image){
              this.bannerUrl = this.image_url + data.image
            }
          })
      })
      }
 
  private initSetting(){
    return this.settingService.getSettingByCode("0").subscribe((data) => {
      this.setting = data
      // this.setting.website_name = data.website_name
      // this.setting.address = data.address
      // this.setting.city = data.city
      // this.setting.email = data.email
      // this.setting.no_telp = data.no_telp
      // this.setting.no_fax = data.no_fax
      // this.setting.copyright = data.copyright
      // this.setting.logo_fb = data.logo_fb
      // this.setting.logo_instagram = data.logo_instagram
      // this.setting.logo_twitter = data.logo_twitter
      
      if(data.logo_fb){
          this.logoFbUrl = this.image_url + data.logo_fb
          }

      if (data.logo_twitter){
        this.logoTwitUrl = this.image_url + data.logo_twitter
      }

      if (data.logo_instagram){
        this.logoIgUrl = this.image_url + data.logo_instagram
      }

    })

  }

}
