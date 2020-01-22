import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Environtment
import { environment } from '../../environments/environment'

import { FrontendComponent } from './frontend.component'

const routes: Routes = [

    {
        path: '',
        component: FrontendComponent,
        children: [
          { path: '',           loadChildren: "./homepage/homepage.module#HomepageModule" },
          { path: 'contact',    loadChildren: "./contact/contact.module#ContactModule" }, 
          { path: 'rent',       loadChildren: "./rent/rent.module#RentModule" }
        ]
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class FrontendRoutingModule { }