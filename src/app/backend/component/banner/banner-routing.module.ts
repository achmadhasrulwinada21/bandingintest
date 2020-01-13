import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { BannerComponent } from './banner.component'
import { BannerEditComponent } from './banner-edit/banner-edit.component'

const routes: Routes = [
    { path: '', component: BannerComponent },
    { path: 'edit/:id', component: BannerEditComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BannerRoutingModule { }