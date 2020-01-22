import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// Environtment
import { environment } from 'src/environments/environment';
import { RentalService } from './rental.service'
import { UploadFileService } from '../../shared/service/upload-file.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

  rentalForm: FormGroup
  dataUrl: String = environment.api_url
  image_url = environment.image_url
  prefix: String = environment.prefix
  edited: Boolean = false
  logoImageUrl       : String = null;
  selectedFiles: FileList
  currentFileUpload: File
  progress: { percentage: number } = { percentage: 0 }

  constructor(private fb: FormBuilder,
              private rentalService: RentalService,
              private route: ActivatedRoute,
              private router: Router,
              private uploadFileService: UploadFileService,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    this.addRow()
    let self = this;


     $(document).on('click', '#editRental', function(){
      let id = $(this).data('id');
      
       return self.rentalService.getRentById(id)
                        .subscribe((data) => {
                          //parsing dari database dari string ke json
                           let json_array = JSON.parse(data.rental_rules.toString())
                           //bersihkan form sebelum ditambahin
                          self.clearFormArray()
                          self.loadRow(json_array)
                            //

                          self.rentalForm.patchValue({
                            id               : data.id,
                            name_equipment   : data.name_equipment,
                            harga_awal       : data.harga_awal,
                            harga_akhir      : data.harga_akhir,
                            image            : data.image
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
                  return self.rentalService.destroyRent(id)
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

    this.uploadFileService.pushFileToStorage(this.currentFileUpload, '/rental', 'image').subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        let EventBodyString = event.body.toString()
        let myObj = JSON.parse(EventBodyString)
        this.logoImageUrl = myObj.fileUrl
        this.rentalForm.patchValue({ image: myObj.fileName })
      }
    })
    this.selectedFiles = undefined
  }

    protected createForm() {
      this.rentalForm = this.fb.group({
        id: [''],
        name_equipment: ['', [Validators.required]],
        harga_awal: ['', [Validators.required]],
        harga_akhir: ['', [Validators.required]],
        image: ['', [Validators.required]],
        rental_ruless: new FormArray([])
      })
    }

    public resetForm() {
      this.id.reset()
      this.name_equipment.reset()
      this.harga_awal.reset()
      this.harga_akhir.reset()
      this.image.reset()
      this.rental_ruless.reset()
    }

   public saveRental() {
        let rental = this.rentalService.saveRental(this.rentalForm.value).toPromise()
                        
          rental.then(() => {
              this.sweetalertService.yourWorkHasBeenSaved('Berhasil Disimpan')
              $('#RentalDatatables').DataTable().ajax.reload();
              this.resetForm()
              this.clearFormArray()
              this.addRow()
             // this.router.navigate([this.prefix + '/statistic'])
          })
        }

  private loadRow(data = null) { 
    if (data != null && data.length > 0) {
      data.map((data, i) => {
        this.t.push(this.fb.group({
          description_rule: [data.description_rule]
        }));

        this.cd.detectChanges()
      })
    } else {
      this.t.push(this.fb.group({
        description_rule: ['']
      }));
    }

  }

    public addRow() {
      this.t.push(this.fb.group({
        description_rule: ['', [Validators.required]],
      }));
    }

    public removeRow() {
      let i = this.t.length
      if (i > 1) {
        this.t.removeAt(i - 1);
      }
    }

  public clearFormArray() {
    const arr = <FormArray>this.rentalForm.controls.rental_ruless;
    arr.controls = [];

  }

  get id() {
    return this.rentalForm.get('id');
  }
  get name_equipment() {
    return this.rentalForm.get('name_equipment');
  }
  get harga_awal() {
    return this.rentalForm.get('harga_awal');
  }
  get harga_akhir() {
    return this.rentalForm.get('harga_akhir');
  }
  get image() {
    return this.rentalForm.get('image');
  }

  get f() { return this.rentalForm.controls }
  get t() { return this.f.rental_ruless as FormArray; }
  // statistics from function createform
  get rental_ruless() { return this.rentalForm.get('rental_ruless') }

  public initDataTables() {
    let self = this;
    $(document).ready(function () {
      $('#RentalDatatables').DataTable({
        ajax: {
          'type': 'GET',
          'url': self.dataUrl + '/list/rents',
          'contentType': 'application/json',
        },
        'serverSide': true,
        'responsive': true,
        columns: [{
          data: 'id'
        }, {
         data: 'name_equipment'
        }, {
          data: 'harga_awal', render: $.fn.dataTable.render.number('.', '.', 0, 'Rp ')
        }, {
          data: 'harga_akhir', render: $.fn.dataTable.render.number('.', '.', 0, 'Rp ')
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
