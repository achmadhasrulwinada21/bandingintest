import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { DetailRentComponent } from './detail-rent.component'

const routes: Routes = [
    { path: '', component: DetailRentComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class DetailRentRoutingModule { }