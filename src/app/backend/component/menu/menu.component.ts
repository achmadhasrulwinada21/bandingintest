import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Service
import { MenuService } from './menu.service'

//import Swal from 'sweetalert2/dist/sweetalert2.js';
// Shared Service
import { SweetalertService } from '../../shared/service/sweetalert.service';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';

// Environtment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menuForm: FormGroup
  dataUrl: String = environment.api_url
  prefix: String = environment.prefix
  edited: Boolean = false

  constructor(private fb: FormBuilder,
              private menusService: MenuService,
              private cd: ChangeDetectorRef,
              private sweetalertService: SweetalertService,
              private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts()
    this.createForm()
  }

  private createForm() {
    this.menuForm = this.fb.group({
      id: [''],
      menu_link: ['', [Validators.required]],
      menu_name: ['', [Validators.required]]
    });
  }

  public createMenu(){

  }

  public resetForm() {
    this.id.reset()
    this.menu_link.reset()
    this.menu_name.reset()
   
    // back to normal button
    if (this.edited) {
      this.edited = false
    }
  }

      get id() {
        return this.menuForm.get('id');
      }
      get menu_link() {
        return this.menuForm.get('menu_link');
      }
      get menu_name() {
        return this.menuForm.get('menu_name');
      }

      public initDataTables() {
      let self = this;
    $(document).ready(function () {
          $('#MenuDatatables').DataTable({
        ajax: {
          'type': 'GET',
          'url': self.dataUrl + '/list/menus',
           'co ntentType': 'application/json',
        },
        'serverSide': true,
        'responsive': true,
        columns: [{
          data: 'id',
          width: '10%'
        }, {
          data: 'menu_name',
          width: '5%'
        }, {
          data: 'menu_link',
          width: '30%'
        },{
          data: null,
          width: '20%',
          searchable: false,
          orderable: false,
          render: function (data, type, row) {
            return `
                    <button id="editMenu"
                            class="btn btn-icon icon-left btn-info"
                            data-id="${data.id}"><i class="far fa-edit"></i> Edit</button> 
      
                    <button id="deleteMenu"
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
