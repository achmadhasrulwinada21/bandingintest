import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { RentalComponent } from './rental.component'

const routes: Routes = [
    { path: '', component: RentalComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class RentalRoutingModule { }