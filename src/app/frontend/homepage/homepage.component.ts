import { Component, OnInit } from '@angular/core';


import { BannerService } from '../../backend/component/banner/banner.service'
import { ProductService } from '../../backend/component/product/product.service'
import { StatisticService } from '../../backend/component/statistic/statistic.service'

// Environtment
import { environment } from 'src/environments/environment';

import { Banner } from '../../backend/component/banner/banner'
import { Product } from '../../backend/component/product/product'
import { Statistic } from '../../backend/component/statistic/statistic'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  image_url = environment.image_url
  prefix: String = environment.prefix

  logoFbUrl: String = null;
  logoIgUrl: String = null;
  logoTwitUrl: String = null;
  bannerUrl: String = null;

  constructor(private bannerService: BannerService,
              private productService: ProductService,
              private statisticService: StatisticService) { }

  ngOnInit() {
    this.initBanner()
    this.initProduct()
    this.initStatistic()
  }

  banner: Banner
  Listproduct: Product
  ListStatistic: Statistic
  JsonStatisctic: Statistic

  private initProduct() {
    return this.productService.getAll().subscribe((data) => {
      this.Listproduct = data
    })
  }

  private initStatistic() {

    this.statisticService.getAll().subscribe((data_statisctic) => {
      return this.statisticService.getStatisticById(data_statisctic[0].id).subscribe((data) => {
        this.ListStatistic = data
        // menampung data array menjadi json
        this.JsonStatisctic = JSON.parse(data.statistic.toString())
      })

    })
  }

  private initBanner() {
    this.bannerService.getAll().subscribe((data_banner) => {
      // console.log(data_banner[0].id)
      return this.bannerService.getBannerByCategory("home").subscribe((data) => {
        this.banner = data
        if (data.image) {
          this.bannerUrl = this.image_url + data.image
        }
      })
    })
  }

}
