import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Global Service
import { SweetalertService } from './backend/shared/service/sweetalert.service';
import { ApiService } from './backend/shared/service/api.service';
import { XRequestService } from './backend/shared/service/xrequest.service';
import { DynamicScriptLoaderService } from './backend/shared/service/dynamic-script.service';
import { SlugifyPipe } from './backend/shared/pipe/slugify.pipe';

import { CookieService } from 'ngx-cookie-service';
import { WINDOW_PROVIDERS } from "./backend/shared/service/window.service";

import { FrontendComponent } from './frontend/frontend.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    FrontendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    SweetalertService,
    ApiService,
    XRequestService,
    DynamicScriptLoaderService,
    SlugifyPipe,
    CookieService,
    WINDOW_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
