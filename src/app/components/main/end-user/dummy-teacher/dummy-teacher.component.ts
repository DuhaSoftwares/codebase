import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { TeacherService } from 'src/app/services/teacher.service';
import { DummyTeacherViewModel } from 'src/app/models/view/end-user/dummy-teacher.viewmodel';
import { BaseComponent } from '../../../base.component';
import { DummyTeacherSM } from 'src/app/models/service/v1/dummy-teacher-s-m';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dummy-teacher',
  templateUrl: './dummy-teacher.component.html',
  styleUrls: ['./dummy-teacher.component.scss']
})
export class DummyTeacherComponent extends BaseComponent<DummyTeacherViewModel> implements OnInit {

  /**
   * comments here and summary of the function
   *
   */
  constructor(private teacherService: TeacherService,
    commonService: CommonService, logService: LogHandlerService) {
    super(commonService, logService);
    this.viewModel = new DummyTeacherViewModel();
    this.viewModel.singleTeacher = new DummyTeacherSM();
  }

  async ngOnInit() {
    await this.loadPageData()
  }

  override async loadPageData() {
    try {
      await this._commonService.presentLoading();
      //have to do paging
      let resp = await this.teacherService.getAllTeachers();
      if (resp.isError) {
        await this._exceptionHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error!',
          text: resp.errorData.displayMessage, timer: 5000,
          position: 'top-right', icon: 'error'
        });
      }
      else {
        this.viewModel.teachers = resp.successData;
      }
    } catch (error) {
      throw error;
    }
    finally {
      await this._commonService.dismissLoader()
    }
  }
  async getTeacherById(teacherId: number) {
    try {
      await this._commonService.presentLoading();
      //have to do paging
      let resp = await this.teacherService.getTeacherById(teacherId);
      if (resp.isError) {
        await this._exceptionHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error!',
          text: resp.errorData.displayMessage, timer: 5000,
          position: 'top-right', icon: 'error'
        });

      }
      else {
        this.viewModel.singleTeacher = resp.successData;
      }
    } catch (error) {
      throw error;
    }
    finally {
      await this._commonService.dismissLoader()
    }
  }


  async saveTeacher(teacherForm: NgForm) {
    if (teacherForm.invalid) {
      this.markAllControlsAsTouched(teacherForm);
      return;
    }
  }



  // async click_OpenAddEditModal(content: TemplateRef<any>, teacherId: number) {
  //   this.viewModel.AddEditModalTitle = teacherId > 0 ? 'Add Teacher' : 'Update Teacher';
  //   this.viewModel.singleTeacher = new DummyTeacherSM();
  //   if (teacherId > 0)
  //     await this.getTeacherById(teacherId);
  //   // await this.modalService.open(content).result.then(
  //   //   (result: any) => {
  //   //   },
  //   //   (reason: any) => {
  //   //   },
  //   // );
  // }


  async deleteTeacher(id: number) {
    try {
      let resp = await this.teacherService.deleteTeacher(id);
    } catch (error) {
      //show error message user friendly 
      throw error;
    }

  }
}
