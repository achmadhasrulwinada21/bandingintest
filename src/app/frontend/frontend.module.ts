import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Lazy Load routing
import { FrontendRoutingModule } from './frontend-routing.module'

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { NgxEditorModule } from 'ngx-editor';

//component
import { FrontendComponent } from './frontend.component'
import { HeaderComponent } from './layout/header/header.component'
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        FrontendRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        LoadingBarHttpClientModule,
        NgxEditorModule
    ],
    declarations: [
        FrontendComponent,
        HeaderComponent,
        FooterComponent
    ],
    providers: []
})
export class FrontendModule { }