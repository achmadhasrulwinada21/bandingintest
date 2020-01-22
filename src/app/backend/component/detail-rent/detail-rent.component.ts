import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// Environtment
import { environment } from 'src/environments/environment';
import { DetailRentService } from './detail-rent.service'
import { UploadFileService } from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-detail-rent',
  templateUrl: './detail-rent.component.html',
  styleUrls: ['./detail-rent.component.css']
})
export class DetailRentComponent implements OnInit {

  detailrentForm: FormGroup
  dataUrl: String = environment.api_url
  image_url = environment.image_url
  prefix: String = environment.prefix
  edited: Boolean = false
  logoImageUrl: String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private detailrentService: DetailRentService,
              private route: ActivatedRoute,
              private router: Router,
              private uploadFileService: UploadFileService,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    let self = this;

            $(document).on('click', '#editRental', function () {
              let id = $(this).data('id');

              return self.detailrentService.getDetailRentById(id)
                .subscribe((data) => {
                  self.detailrentForm.patchValue({
                    id: data.id,
                    title: data.title,
                    description: data.description,
                    image: data.image
                  })

                  self.logoImageUrl = environment.image_url + "" + data.image
                  //console.log(this.logoImageUrl)
                  self.edited = true
                  self.cd.detectChanges();
                })
            });

            $(document).on('click', '#deleteRental', function () {
              let id = $(this).data('id');
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert tis!",
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
                  return self.detailrentService.destroyDetailRent(id)
                    .subscribe(() => {
                      //refresh datatable setelah data ini dihapus 
                      $('#RentalDatatables').DataTable().ajax.reload();
                    });
                }
              })
            });

  }

  public selectFile(event) {
    this.progress.percentage = 0
    this.selectedFiles = event.target.files
    this.currentFileUpload = this.selectedFiles.item(0)

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/rental_detail', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj = JSON.parse(EventBodyString)
        this.logoImageUrl = myObj.fileUrl
        this.detailrentForm.patchValue({ image: myObj.fileName })
      }
    })
    this.selectedFiles = undefined
  }

  protected createForm() {
    this.detailrentForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }

  public resetForm() {
    this.id.reset()
    this.title.reset()
    this.description.reset()
    this.image.reset()
  }

  public savedetailRental() {
    let rental = this.detailrentService.saveDetailrent(this.detailrentForm.value).toPromise()

    rental.then(() => {
      this.sweetalertService.yourWorkHasBeenSaved('Berhasil Disimpan')
      $('#RentalDatatables').DataTable().ajax.reload();
      this.resetForm()
      // this.router.navigate([this.prefix + '/statistic'])
    })
  }

  get id() {
    return this.detailrentForm.get('id');
  }
  get title() {
    return this.detailrentForm.get('title');
  }
  get description() {
    return this.detailrentForm.get('description');
  }
  get image() {
    return this.detailrentForm.get('image');
  }

      public initDataTables() {
        let self = this;
        $(document).ready(function () {
          $('#RentalDatatables').DataTable({
            ajax: {
              'type': 'GET',
              'url': self.dataUrl + '/list/rentdesciptions',
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
                                <button id="editRental"
                                        class="btn btn-icon icon-left btn-info"
                                        data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
                  
                                <button id="deleteRental"
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
