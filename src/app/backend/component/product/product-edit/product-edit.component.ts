// Core
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

// Service
import { ProductService } from '../product.service'
import { UploadFileService } from '../../../shared/service/upload-file.service';
import { SweetalertService } from '../../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../../shared/service/dynamic-script.service';

// Environtment
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  editProduct: FormGroup
  image_url: String = environment.image_url
  prefix: String = environment.prefix

  imgUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private uploadFileService: UploadFileService,
    private sweetalertService: SweetalertService) {
    this.createForm()
    this.initValue()
  }

  ngOnInit() { }

  public updateProduct() {
    this.route.params.subscribe(params => {
      return this.productService.updateProduct(params['id'], this.editProduct.value)
        .subscribe(() => {
          this.sweetalertService.yourWorkHasBeenSaved('Product Has Been Updated')
          this.router.navigate([this.prefix + '/product'])
        })
    })
  }

  public selectFile(event) {
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/product', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.editProduct.patchValue({ image: myObj.fileName })
      }
          })

    this.selectedFiles = undefined
  }

  public initValue() {
    this.route.params.subscribe(params => {
      return this.productService.getProductById(params['id'])
        .subscribe((data) => {
          this.editProduct.setValue({
            title: data.title,
            description: data.description,
            image: data.image,
          })

          this.imgUrl = this.image_url + "" + data.image
        })
    })
  }


  public editorConfig = {
    height: '400px',
    minHeight: '500px',
    width: '100%',
    url: this.image_url
  };

  private createForm() {
    this.editProduct = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  get title() {
    return this.editProduct.get('title')
  }
  get description() {
    return this.editProduct.get('description')
  }
  get image() {
    return this.editProduct.get('image')
  }

}
