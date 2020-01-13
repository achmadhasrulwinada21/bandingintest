import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Lazy Load routing
import { BannerRoutingModule } from "./banner-routing.module";

// Component
import { BannerComponent } from "./banner.component";
import { DataTablesModule } from 'angular-datatables';


import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxEditorModule } from 'ngx-editor';
import { BannerEditComponent } from './banner-edit/banner-edit.component';

@NgModule({
    imports: [
        CommonModule,
        BannerRoutingModule,
        InputTextareaModule,
        ReactiveFormsModule,
        HttpClientModule,
        DataTablesModule,
        NgxEditorModule
    ],
    declarations: [
        BannerComponent,
        BannerEditComponent
    ]
})
export class BannerModule { }