import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { MenuComponent } from './menu.component'

const routes: Routes = [
    { path: '', component: MenuComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MenuRoutingModule { }