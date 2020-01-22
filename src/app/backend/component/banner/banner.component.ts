import { Component, OnInit, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { Router, ActivatedRoute } from "@angular/router";

// Service
import { BannerService } from './banner.service'
import { UploadFileService } from '../../shared/service/upload-file.service';
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
    bannerForm: FormGroup
    dataUrl: String = environment.api_url
    prefix: String = environment.prefix
    edited: Boolean = false
    image_url = environment.image_url
    imgUrl: String = null;
    selectedFiles: FileList
    currentFileUpload: File
    progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private bannerService: BannerService,
              private router: Router,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService,
              private uploadFileService: UploadFileService,
              private zone: NgZone) { }

  ngOnInit() {
    this.createForm()
    this.loadScripts()
    let self = this;

    $(document).on('click', '#editBanner', function(){
        let id = $(this).data('id'); 
    self.zone.run(() => self.router.navigate([ self.prefix +'/banner/edit/' + id]))
    });

    $(document).on('click', '#deleteBanner', function(){
        let id = $(this).data('id');
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            return   self.bannerService.destroyBanner(id)
                      .subscribe(() => {
                        $('#BannerDatatables').DataTable().ajax.reload();
                      });
            }
          })
    });

  }

  public selectFile(event){
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/banner','image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj           = JSON.parse(EventBodyString)
        this.imgUrl = myObj.fileUrl
        this.bannerForm.patchValue({ image : myObj.fileName })
      }
    })
    this.selectedFiles = undefined
    }

    public createBanner() {
      this.bannerService.saveBanner(this.bannerForm.value).subscribe(
        () => {
          this.sweetalertService.yourWorkHasBeenSaved('Berhasil Disimpan')
          $('#BannerDatatables').DataTable().ajax.reload();
          this.resetForm();
        })
    }
    
   private createForm() {
     this.bannerForm = this.fb.group({
      id: [''],
      title:       ['', [Validators.required]],
      button_name: ['', [Validators.required]],
      button_link: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category:    ['', [Validators.required]],
      image:       ['', [Validators.required]]
    });
  }
  public resetForm() {
    this.id.reset()
    this.title.reset()
    this.category.reset()
    this.description.reset()
    this.button_name.reset()
    this.button_link.reset()
    this.image.reset()
  }

        get id() {
          return this.bannerForm.get('id');
            }
        get title() {
          return this.bannerForm.get('title');
            }
        get button_name() {
          return this.bannerForm.get('button_name');
            }

       get button_link() {
              return this.bannerForm.get('button_link');
         }
      get description() {
        return this.bannerForm.get('description');
          }
       get image() {
          return this.bannerForm.get('image');
            }
      get category() {
        return this.bannerForm.get('category');
      }

      public initDataTables() {
              let self = this;
            $(document).ready(function () {
                $('#BannerDatatables').DataTable({
                ajax: {
                  'type': 'GET',
                  'url': self.dataUrl + '/list/banners',
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
                            <button id="editBanner"
                                    class="btn btn-icon icon-left btn-info"
                                    data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
              
                            <button id="deleteBanner"
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
