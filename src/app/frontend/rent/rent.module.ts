import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

// Lazy Load routing
import { RentRoutingModule } from "./rent-routing.module";

// Component
import { RentComponent } from "./rent.component";


@NgModule({
    imports: [
        CommonModule,
        RentRoutingModule
    ],
    declarations: [RentComponent]
})
export class RentModule { }