import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { ProductRoutingModule } from "./product-routing.module";

// Component
import { ProductComponent } from "./product.component";
import { DataTablesModule } from 'angular-datatables';


import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,
        ProductRoutingModule,
        InputTextareaModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        NgxEditorModule
    ],
    declarations: [
        ProductComponent
    ]
})
export class ProductModule { }