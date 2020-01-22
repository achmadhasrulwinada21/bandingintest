import { Component, OnInit } from '@angular/core';

import { ContactService } from '../../../frontend/contact/contact.service'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DynamicScriptLoaderService } from '../../shared/service/dynamic-script.service';
// Environtment
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-form-contact',
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.css']
})
export class FormContactComponent implements OnInit {

  dataUrl: String = environment.api_url
  prefix: String = environment.prefix
  constructor(private contactService:ContactService,
              private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.loadScripts()
    let self =this;

            $(document).on('click', '#deleteContact', function () {
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
                  return self.contactService.destroyContact(id)
                    .subscribe(() => {
                      //refresh datatable setelah data ini dihapus 
                      $('#ContactDatatables').DataTable().ajax.reload();
                    });
                }
              })
            });

  }

  public initDataTables() {
    let self = this;
    $(document).ready(function () {
      $('#ContactDatatables').DataTable({
        ajax: {
          'type': 'GET',
          'url': self.dataUrl + '/list/formcontacts',
          'contentType': 'application/json',
        },
        'serverSide': true,
        'responsive': true,
        columns: [{
          data: 'id',
          width: '5%'
        }, {
          data: 'name'
        }, {
          data: 'category'
        },{
          data: 'product'
        },{
          data: 'price', render: $.fn.dataTable.render.number('.', '.', 0, 'Rp ')
        },{
          data: null,
          width: '20%',
          searchable: false,
          orderable: false,
          render: function (data, type, row) {
            return `    
                    <button id="deleteContact"
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
