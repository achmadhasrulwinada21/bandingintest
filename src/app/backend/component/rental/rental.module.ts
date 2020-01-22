import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { RentalRoutingModule } from "./rental-routing.module";

// Component
import { RentalComponent } from "./rental.component";
import { DataTablesModule } from 'angular-datatables';


import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
    imports: [
        CommonModule,
        RentalRoutingModule,
        InputTextareaModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        NgxEditorModule
    ],
    declarations: [
        RentalComponent
    ]
})
export class RentalModule { }