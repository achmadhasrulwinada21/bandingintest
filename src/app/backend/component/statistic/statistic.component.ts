import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { StatisticService } from './statistic.service'
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
// Environtment
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  statisticForm: FormGroup
  StatisticData = []
  ListStatistic = []
  ListStatisticSelected = null
  dataUrl: String = environment.api_url
  prefix: String = environment.prefix
  edited: Boolean = false

  
  constructor(private fb: FormBuilder,
              private statisticService:StatisticService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService,) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
    this.addRow()
    let self = this;
    
     $(document).on('click', '#editStatistic', function(){
      let id = $(this).data('id');
      
       return self.statisticService.getStatisticById(id)
                        .subscribe((data) => {
                          //parsing dari database dari string ke json
                           let json_array = JSON.parse(data.statistic.toString())
                           //bersihkan form sebelum ditambahin
                          self.clearFormArray()
                          self.loadRow(json_array)
                            //

                          self.statisticForm.patchValue({
                            id               : data.id,
                            title            : data.title,
                            description      : data.description
                          })
                          self.edited = true
                          self.cd.detectChanges();
                        })
            });

    $(document).on('click', '#deleteStatistic', function () {
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
                  return self.statisticService.destroyStatistic(id)
                    .subscribe(() => {
                    //refresh datatable setelah data ini dihapus 
                    $('#StatisticDatatables').DataTable().ajax.reload(); 
                    });
                  }
                })
            });
    }

   
  protected createForm() {
    this.statisticForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      statistics: new FormArray([])
    })
  }



  private loadRow(data = null) { 
    if (data != null && data.length > 0) {
      data.map((data, i) => {
        this.t.push(this.fb.group({
          statistic_title: [data.statistic_title],
          statistic_data: [data.statistic_data]
        }));

        this.cd.detectChanges()
      })
    } else {
      this.t.push(this.fb.group({
        statistic_title: [''],
        statistic_data: ['']
      }));
    }

  }

    public resetForm() {
    this.id.reset()
    this.title.reset()
    this.description.reset()
    this.statistics.reset()
  }

    get id() {
    return this.statisticForm.get('id');
    }
    get title() {
      return this.statisticForm.get('title');
    }
    get description() {
      return this.statisticForm.get('description');
    }

      public saveStatistic() {
        let statistic = this.statisticService.saveStatistic(this.statisticForm.value).toPromise()
                        
        statistic.then(() => {
              this.sweetalertService.yourWorkHasBeenSaved('Berhasil Disimpan')
              $('#StatisticDatatables').DataTable().ajax.reload();
              this.resetForm()
              this.clearFormArray()
              this.addRow()
              this.router.navigate([this.prefix + '/statistic'])
          })
        }
  
  public addRow() {
    this.t.push(this.fb.group({
    statistic_title :['', [Validators.required]],
    statistic_data:['',[Validators.required]]
    }));
  }
 
  public removeRow() {
    let i = this.t.length
     if (i > 1){
      this.t.removeAt(i - 1);
     }
  }

  public clearFormArray() {
    const arr = <FormArray>this.statisticForm.controls.statistics;
    arr.controls = [];

  }

  get f() { return this.statisticForm.controls }
  get t() { return this.f.statistics as FormArray; }
  // statistics from function createform
  get statistics() { return this.statisticForm.get('statistics') }

   public initDataTables() {
      let self = this;
          $(document).ready(function () {
                $('#StatisticDatatables').DataTable({
              ajax: {
                  'type': 'GET',
                  'url': self.dataUrl + '/list/statistics',
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
                  data : 'statistic',
                  render: function (data) {
                    var html = ''  
                    var json_array = JSON.parse(data)
                    html += '<ul>'
                    json_array.forEach(json => {
                     html += '<li>' + json.statistic_title + ' : ' + json.statistic_data + '</li>'
                    })
                   html += '</ul>'
                    return `${html}`;
                  },
                },
                {
                  data: null,
                  width: '20%',
                  searchable: false,
                  orderable: false,
                  render: function (data, type, row) {
                    return `
                            <button id="editStatistic"
                                    class="btn btn-icon icon-left btn-info"
                                    data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
              
                            <button id="deleteStatistic"
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
