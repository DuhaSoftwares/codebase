import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminLoginRoutingModule } from './superadmin-login-routing.module';
import { SuperadminLoginComponent } from './superadmin-login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SuperadminLoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SuperadminLoginRoutingModule
  ]
})
export class SuperadminLoginModule { }
