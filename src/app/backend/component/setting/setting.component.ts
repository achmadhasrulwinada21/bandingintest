import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Environtment
import { environment } from 'src/environments/environment';

// service
import { SettingService } from './setting.service'

// SharedService
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { UploadFileService } from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingForm             : FormGroup;
  image_url                         = environment.image_url
  prefix                  : String  = environment.prefix

  logoFbUrl               : String = null;
  logoInstagramUrl        : String = null;
  logoTwitterUrl          : String = null;
  selectedFiles           : FileList
  currentFileUpload       : File
  progress: { percentage  : number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private uploadFileService: UploadFileService,
              private settingService: SettingService,
              private sweetalertService: SweetalertService ) { }

  ngOnInit() {
    this.createForm()
    this.initSetting()
  }

  settingApply(){
    console.log(this.settingForm.value.code)
    // let data_setting = this.settingForm.value.code = null;

    // console.log(data_setting)
  
       this.settingService.saveSetting(this.settingForm.value)
                      .subscribe((data) => {
                        this.settingForm.patchValue({
                          id:data.id
                        })
            this.sweetalertService.yourWorkHasBeenSaved("Settings has been Save")                   
         })
      
  }

  initSetting(){

         return this.settingService.getSettingByCode("0")
           .subscribe((data) => { 
             console.log(data) 
                
             let data_setting = data !== null ? data : null;

             if (data_setting) {
                  this.settingForm.patchValue({
                 id:data.id,  
                 website_name: data_setting.website_name,
                 address: data_setting.address,
                 city: data_setting.city,
                 email: data_setting.email,
                 no_telp: data_setting.no_telp,
                 no_fax: data_setting.no_fax,
                 code  :data_setting.code,
                 copyright: data_setting.copyright,
                 logo_fb: data_setting.logo_fb,
                 logo_instagram:data_setting.logo_instagram,
                 logo_twitter:data_setting.logo_twitter
               })
               if (data_setting.logo_fb) {
                 this.logoFbUrl = this.image_url + data_setting.logo_fb
               }

               if (data_setting.logo_twitter) {
                 this.logoTwitterUrl = this.image_url + data_setting.logo_twitter
               }

               if (data_setting.logo_instagram) {
                 this.logoInstagramUrl = this.image_url + data_setting.logo_instagram
               }
             }              
           }); //tutup subscribe
  }

  public selectFile(event, type_image) {
          this.progress.percentage = 0
          this.selectedFiles = event.target.files
          this.currentFileUpload = this.selectedFiles.item(0)
    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/setting', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse){
            let EventBodyString = event.body.toString()
            let myObj = JSON.parse(EventBodyString)

            if(type_image === 'logo_fb'){
                this.logoFbUrl = myObj.fileUrl
                this.settingForm.patchValue({ logo_fb : myObj.fileName })
           }
           
            if (type_image === 'logo_instagram') {
                this.logoInstagramUrl = myObj.fileUrl
                this.settingForm.patchValue({ logo_instagram: myObj.fileName })
            }

              if (type_image === 'logo_twitter') {
                  this.logoTwitterUrl = myObj.fileUrl
                  this.settingForm.patchValue({ logo_twitter: myObj.fileName })
            }

      }

    })
     this.selectedFiles = undefined
  }

  private createForm(){
     this.settingForm  = this.fb.group({
       id           : [null],
    website_name    : ['',[Validators.required]],
    address         : [''],
    city            : [''],
    copyright       : [''],
    email           : [''],
    code            : [null],
    logo_fb         : [''],
    logo_instagram  : [''],
    logo_twitter    : [''],
    no_fax          : [''], 
    no_telp         : [''],
    });
  }

      get id() {
        return this.settingForm.get('id');
        }
    get code() {
         return this.settingForm.get('code');
        }
      get website_name() {
        return this.settingForm.get('website_name');
          }
      get address() {
        return this.settingForm.get('address');
          }

      get city() {
        return this.settingForm.get('city');
          }
      get copyright() {
        return this.settingForm.get('copyright');
      }
      get email() {
        return this.settingForm.get('email');
      }

      get logo_fb() {
        return this.settingForm.get('logo_fb');
      }

      get logo_instagram() {
        return this.settingForm.get('logo_instagram');
      }
      get logo_twitter() {
        return this.settingForm.get('logo_twitter');
      }

      get no_fax() {
        return this.settingForm.get('no_fax');
      }

      get no_telp() {
        return this.settingForm.get('no_telp');
      }

}
