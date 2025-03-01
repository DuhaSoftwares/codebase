import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { DummyTeacherClient } from '../clients/dummy-teacher.client';
import { BaseService } from './base.service';
import { ApiResponse } from '../models/service/api-contracts/base/api-response';
import { DeleteResponseRoot } from '../models/service/common-response/delete-response-root';
import { DummyTeacherSM } from '../models/service/v1/dummy-teacher-s-m';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends BaseService {



  constructor(private teacherClient: DummyTeacherClient) {
    super();

  }

  async getAllTeachers(): Promise<ApiResponse<DummyTeacherSM[]>> {
    return await this.teacherClient.GetAllTeachers();
  }

  async getTeacherById(id: number): Promise<ApiResponse<DummyTeacherSM>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error)
    }
    return await this.teacherClient.GetTeacherById(id);
  }
  async deleteTeacher(id: number): Promise<ApiResponse<DeleteResponseRoot>> {
    if (id <= 0) {
      throw new Error(AppConstants.ERROR_PROMPTS.Delete_Data_Error)
    }
    return await this.teacherClient.DeleteTeacherById(id);
  }

}
