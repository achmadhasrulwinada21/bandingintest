import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { DetailRentRoutingModule } from "./detail-rent-routing.module";

// Component
import { DetailRentComponent } from "./detail-rent.component";
import { DataTablesModule } from 'angular-datatables';


import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,
        DetailRentRoutingModule,
        InputTextareaModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        NgxEditorModule
    ],
    declarations: [
        DetailRentComponent
    ]
})
export class DetailRentModule { }