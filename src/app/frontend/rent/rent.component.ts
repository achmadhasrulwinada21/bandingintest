import { Component, OnInit } from '@angular/core';

import { BannerService } from '../../backend/component/banner/banner.service'
import { Banner } from '../../backend/component/banner/banner'
import { RentalService } from '../../backend/component/rental/rental.service'
import { Rental } from '../../backend/component/rental/rental'
import { DetailRentService } from '../../backend/component/detail-rent/detail-rent.service'
import { DetailRent }  from '../../backend/component/detail-rent/detail-rent'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  image_url = environment.image_url
  prefix: String = environment.prefix
  bannerUrl: String = null;
  detailrentUrl: String = null;
  rentUrl: String = null;
  rent_array = []
  constructor(private bannerService: BannerService,
              private detailrentService: DetailRentService,
              private rentalService: RentalService ) { }

  ngOnInit() {
    this.initBanner()
    this.iniDetailRent()
    this.initRental()
  }
  banner: Banner
  detailrent: DetailRent
  rental: Rental
  Jsonrental: Rental
  private initBanner() {
    this.bannerService.getAll().subscribe((data_banner) => {
      // console.log(data_banner[0].id)
      return this.bannerService.getBannerByCategory("equipment").subscribe((data) => {
        this.banner = data
        if (data.image) {
          this.bannerUrl = this.image_url + data.image
        }
      })
    })
  }

  private iniDetailRent(){
      this.detailrentService.getAll().subscribe((data_dtl_rent) => {
      // console.log(data_banner[0].id)
        return this.detailrentService.getDetailRentById(data_dtl_rent[0].id).subscribe((data) => {
          this.detailrent = data
        if (data.image) {
          this.detailrentUrl = this.image_url + data.image
        }
      })
    })
  }

  private initRental(){
        this.rentalService.getAll().subscribe((data) => {
          this.rental = data
           data.map((data_looping)=>{
               this.rent_array.push(JSON.parse(data_looping.rental_rules))
            })    
          if (data.image) {
            this.rentUrl = this.image_url + data.image
          }
        })
  }
}
