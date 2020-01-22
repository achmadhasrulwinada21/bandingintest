import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { BannerService } from '../../backend/component/banner/banner.service'
import { Banner } from '../../backend/component/banner/banner'
import { environment } from 'src/environments/environment';
//import { Contact } from './contact'
import { ContactService} from './contact.service'
import { SweetalertService } from '../../backend/shared/service/sweetalert.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup
  dataUrl: String = environment.api_url
  image_url = environment.image_url
  prefix: String = environment.prefix
  banner1Url: String = null;

  constructor(private fb: FormBuilder,
              private bannerService: BannerService,
              private contactService: ContactService,
              private sweetalertService: SweetalertService) { }

  ngOnInit() {
    this.createForm()
    this.initBanner()
  }

  banner: Banner

  private createForm() {
    this.contactForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      product: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  public createContact() {
    this.contactService.saveContact(this.contactForm.value).subscribe(
      () => {
        this.sweetalertService.yourWorkHasBeenSaved('Success Sending')
        this.resetForm();
      })
  }

  public resetForm() {
    this.id.reset()
    this.name.reset()
    this.category.reset()
    this.product.reset()
    this.price.reset()
  }

  get id() {
    return this.contactForm.get('id');
  }
  get name() {
    return this.contactForm.get('name');
  }
  get category() {
    return this.contactForm.get('category');
  }
  get product() {
    return this.contactForm.get('product');
  }
  get price() {
    return this.contactForm.get('price');
  }

  private initBanner() {
    this.bannerService.getAll().subscribe((data_banner) => {
      // console.log(data_banner[0].id)
      return this.bannerService.getBannerByCategory("contact").subscribe((data) => {
        this.banner = data
        if (data.image) {
          this.banner1Url = this.image_url + data.image
        }
      })
    })
  }

}
