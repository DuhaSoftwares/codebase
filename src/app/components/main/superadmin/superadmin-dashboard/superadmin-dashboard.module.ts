import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminDashboardRoutingModule } from './superadmin-dashboard-routing.module';
import { SuperadminDashboardComponent } from './superadmin-dashboard.component';


@NgModule({
  declarations: [
    SuperadminDashboardComponent
  ],
  imports: [
    CommonModule,
    SuperadminDashboardRoutingModule
  ]
})
export class SuperadminDashboardModule { }
