import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend/frontend.component'

// Environtment
import { environment } from 'src/environments/environment';


const routes: Routes = [
  {
    path:'',
    component: FrontendComponent
  },
  {
    path: environment.prefix,
    loadChildren: "./backend/backend.module#BackendModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
