import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router"

import { StatisticComponent } from './statistic.component'

const routes: Routes = [
    { path: '', component: StatisticComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class StatisticRoutingModule { }