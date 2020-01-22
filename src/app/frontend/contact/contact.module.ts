import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// Lazy Load routing
import { ContactRoutingModule } from "./contact-routing.module";

// Component
import { ContactComponent } from "./contact.component";
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        InputTextareaModule,
        ContactRoutingModule
    ],
    declarations: [ContactComponent]
})
export class ContactModule { }