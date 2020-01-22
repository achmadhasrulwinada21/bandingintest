import { Component, OnInit } from '@angular/core';

//menggunakan fa fa icon nya angular
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

//service

import { MenuService } from '../backend/component/menu/menu.service' 
import { SettingService } from '../backend/component/setting/setting.service'
import { BannerService } from '../backend/component/banner/banner.service'
import { ProductService } from '../backend/component/product/product.service'
import { StatisticService } from '../backend/component/statistic/statistic.service'
// Environtment
import { environment } from 'src/environments/environment';

// Model
import { Setting }     from '../backend/component/setting/setting'
import { Banner }      from '../backend/component/banner/banner'
import { Product }             from '../backend/component/product/product'
import { Statistic } from '../backend/component/statistic/statistic'

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
               private productService: ProductService,
               private statisticService: StatisticService ){ 
   
  }

   ngOnInit() {
     this.getListMenu()
     this.initSetting()
     this.initBanner()
     this.initProduct()
     this.initStatistic()
  }

  menu_name : String = null
  ListMenu = []
  setting: Setting
  banner:  Banner
  Listproduct: Product
  ListStatistic: Statistic 
  JsonStatisctic: Statistic
  
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

    private initStatistic(){

      this.statisticService.getAll().subscribe((data_statisctic)=>{
          return this.statisticService.getStatisticById(data_statisctic[0].id).subscribe((data) => {
              this.ListStatistic = data
            // menampung data array menjadi json
            this.JsonStatisctic = JSON.parse(data.statistic.toString())
         })
                
        })
    }

    private initBanner(){
      this.bannerService.getAll().subscribe((data_banner) => {
         // console.log(data_banner[0].id)
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
