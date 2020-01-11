import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Lazy Load routing
import { BackendRoutingModule } from "./backend-routing.module";

// Component
import { BackendComponent } from "./backend.component";

//package
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { NgxEditorModule } from 'ngx-editor';
import { FooterComponent } from './layout/footer/footer.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavigateTopComponent } from './layout/navigate-top/navigate-top.component';

@NgModule({
    imports: [
        CommonModule,
        BackendRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoadingBarHttpClientModule,
        NgxEditorModule
    ],
    declarations: [
        BackendComponent,
        FooterComponent,
        MainComponent,
        SidebarComponent,
        NavigateTopComponent,
       
    ],
    providers: []
})
export class BackendModule { }

