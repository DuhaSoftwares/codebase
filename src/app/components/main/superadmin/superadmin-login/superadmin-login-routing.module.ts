import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperadminLoginComponent } from './superadmin-login.component';

const routes: Routes = [{ path: '', component: SuperadminLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminLoginRoutingModule { }
