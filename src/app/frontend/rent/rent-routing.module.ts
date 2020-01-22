import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RentComponent } from './rent.component';

const routes: Routes = [
    { path: '', component: RentComponent },

];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RentRoutingModule { }