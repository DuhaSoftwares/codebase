import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyTeacherComponent } from './dummy-teacher.component';

const routes: Routes = [{ path: '', component: DummyTeacherComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyTeacherRoutingModule { }
