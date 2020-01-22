import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { FormContactComponent } from './form-contact.component'

const routes: Routes = [
    { path: '', component: FormContactComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FormContactRoutingModule { }