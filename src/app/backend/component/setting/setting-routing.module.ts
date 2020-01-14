import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { SettingComponent } from './setting.component'


const routes: Routes = [
    { path: '', component: SettingComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class SettingRoutingModule { }