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
  dataUrl: String = environment.api_url
  prefix: String = environment.prefix
  

  constructor(private fb: FormBuilder,
              private statisticService:StatisticService,
              private route: ActivatedRoute,
              private router: Router,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService,) { }

  ngOnInit() {
    this.createForm()
    this.addRow()
    this.loadScripts()    
    }

   
  protected createForm() {
    this.statisticForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      statistics: new FormArray([])
    })
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
              this.router.navigate([this.prefix + '/statistic'])
          })
        }
  
  public addRow() {
    this.t.push(this.fb.group({
    statistic_title:[''],
    statistic_data:['']
    }));
  }

  public removeRow() {
    let i = this.t.length
     if (i > 1){
      this.t.removeAt(i - 1);
     }
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
