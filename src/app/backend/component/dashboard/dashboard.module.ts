import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

// Lazy Load routing
import { DashboardRoutingModule } from "./dashboard-routing.module";

// Component
import { DashboardComponent } from "./dashboard.component";

// Chart js
import { ChartModule } from 'angular2-chartjs';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartModule
    ],
    declarations: [DashboardComponent]
})
export class DashboardModule { }