import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FrontendComponent } from './frontend/frontend.component'

const routes: Routes = [
  {
    path:'frontend',
    component: FrontendComponent
  },
  {
    path: '',
    loadChildren: "./backend/backend.module#BackendModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
