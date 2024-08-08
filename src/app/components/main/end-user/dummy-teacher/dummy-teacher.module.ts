import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyTeacherRoutingModule } from './dummy-teacher-routing.module';
import { DummyTeacherComponent } from './dummy-teacher.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DummyTeacherComponent
  ],
  imports: [
    CommonModule,
    DummyTeacherRoutingModule,
    FormsModule
  ]
})
export class DummyTeacherModule { }
