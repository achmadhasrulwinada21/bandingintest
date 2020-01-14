import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Environtment
import { environment } from '../../environments/environment'

// Package
import { BackendComponent } from './backend.component';

const routes: Routes = 
    [ 
    { path:'',
        component:BackendComponent,
        children: [
            { path: '',                 redirectTo: 'dashboard' },
            { path: 'dashboard',        loadChildren: "./component/dashboard/dashboard.module#DashboardModule" },
            { path: 'menu',             loadChildren: "./component/menu/menu.module#MenuModule" },
            { path: 'product',          loadChildren: "./component/product/product.module#ProductModule" },
            { path: 'banner', loadChildren: "./component/banner/banner.module#BannerModule" },
            { path: 'setting', loadChildren: "./component/setting/setting.module#SettingModule" },
        ]
    }
    ];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class BackendRoutingModule { }