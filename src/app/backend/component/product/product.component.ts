import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
// Service
import { ProductService } from './product.service'
import { UploadFileService } from '../../shared/service/upload-file.service';
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup
  dataUrl: String = environment.api_url
  prefix: String = environment.prefix
  edited: Boolean = false
  image_url = environment.image_url
  imgUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private uploadFileService: UploadFileService) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    let self = this;
  }

  
  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/product','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.productForm.patchValue({ image : myObj.fileName })
      }
    })
    this.selectedFiles = undefined
    }

  public createProduct() {
        this.productService.saveProduct(this.productForm.value).subscribe(
          () => {
            this.sweetalertService.yourWorkHasBeenSaved('Berhasil Disimpan')
            $('#ProductDatatables').DataTable().ajax.reload();
            this.resetForm();
          })
      }

      private createForm() {
     this.productForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  public resetForm() {
    this.id.reset()
    this.title.reset()
    this.description.reset()
    this.image.reset()
    // back to normal button
    if(this.edited) {
      this.edited = false
    }
  }

  public editorConfig = {
        height: '400px',
        minHeight: '500px',
        width: '100%',
        url: this.image_url
  };

  get id() {
    return this.productForm.get('id');
  }
  get title() {
    return this.productForm.get('title');
  }
  get description() {
    return this.productForm.get('description');
  }

   get image() {
     return this.productForm.get('image');
  }

 public initDataTables() {
      let self = this;
    $(document).ready(function () {
        $('#ProductDatatables').DataTable({
        ajax: {
          'type': 'GET',
          'url': self.dataUrl + '/list/products',
           'contentType': 'application/json',
        },
        'serverSide': true,
        'responsive': true,
        columns: [{
          data: 'id'
        }, {
          data: 'title'
         }, {
          data: 'description'
        },{
          data: null,
          width: '20%',
          searchable: false,
          orderable: false,
          render: function (data, type, row) {
            return `
                    <button id="editProduct"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteProduct"
                            class="btn btn-icon icon-left btn-danger"
                            data-id="${data.id}"><i class="fas fa-times"></i> Delete</button>
                `;
          }
        }]
      });

    });
  }

  public loadScripts() {
    // You can load multiple scripts by just providing the key as argument into load method of the service
    this.dynamicScriptLoader.load('DataTables', 'DataTablesJpa').then(data => {
      // Script Loaded Successfully
      this.initDataTables()
    }).catch(error => console.log(error));
  }

}
