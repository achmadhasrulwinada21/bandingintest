import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { FormContactRoutingModule } from "./form-contact-routing.module";

// Component
import { FormContactComponent } from "./form-contact.component";
import { DataTablesModule } from 'angular-datatables';


import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        FormContactRoutingModule,
        InputTextareaModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule
    ],
    declarations: [
        FormContactComponent
    ]
})
export class FormContactModule { }