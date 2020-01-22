// Core
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

//service
import { BannerService } from '../banner.service'
import { UploadFileService } from '../../../shared/service/upload-file.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit {
      editBanner: FormGroup
      image_url: String = environment.image_url
      prefix: String = environment.prefix

      imgUrl: String = null;
      selectedFiles: FileList
      currentFileUpload: File
      progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private bannerService: BannerService,
              private uploadFileService: UploadFileService,
              private sweetalertService: SweetalertService)
               {
                this.createForm()
                this.initValue()
               }

  ngOnInit() {
  }

  public updateBanner() {
     this.route.params.subscribe(params => {
      return this.bannerService.updateBanner(params['id'], this.editBanner.value)
        .subscribe(() => {
          this.sweetalertService.yourWorkHasBeenSaved('Banner Has Been Updated')
          this.router.navigate([this.prefix + '/banner'])
        })
    })
  }

   public selectFile(event) {
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/banner', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.editBanner.patchValue({ image: myObj.fileName })
      }
          })

    this.selectedFiles = undefined
  }

  public initValue() {
    this.route.params.subscribe(params => {
        return this.bannerService.getBannerById(params['id'])
        .subscribe((data) => {
          this.editBanner.setValue({
            title: data.title,
            description: data.description,
            button_link: data.button_link,
            button_name: data.button_name,
            category: data.category,
            image: data.image,
          })

          this.imgUrl = this.image_url + "" + data.image
        })
    })
  }

  private createForm() {
    this.editBanner = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(4)]],
        description: ['', [Validators.required]],
        button_link: ['', [Validators.required]],
        button_name: ['', [Validators.required]],
        category: ['', [Validators.required]],
        image: ['', [Validators.required]],
    });
  }

  get title() {
            return this.editBanner.get('title')
          }
  get description() {
            return this.editBanner.get('description')
          }
  get button_link() {
            return this.editBanner.get('button_link')
          }
  get button_name() {
            return this.editBanner.get('button_name')
          }
  get image() {
            return this.editBanner.get('image')
          }
  get category() {
    return this.editBanner.get('category')
         }

}
