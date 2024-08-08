import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { AccountsClient } from '../clients/accounts.client';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { ApiRequest } from '../models/service/api-contracts/base/api-request';
import { ApiResponse } from '../models/service/api-contracts/base/api-response';
import { RoleTypeSM } from '../models/service/enums/role-type-s-m.enum';
import { TokenRequestSM } from '../models/service/token/token-request-s-m';
import { TokenResponseSM } from '../models/service/token/token-response-s-m';
import { LoginUserSM } from '../models/service/v1/app-users/login/login-user-s-m';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(private accountClient: AccountsClient, private storageService: StorageService) {
    super();
  }

  async generateToken(tokenReq: TokenRequestSM, rememberUser: boolean): Promise<ApiResponse<TokenResponseSM>> {
    if (!tokenReq || !tokenReq.loginId)// null checks
    {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    }
    else {
      let apiRequest = new ApiRequest<TokenRequestSM>();
      apiRequest.reqData = tokenReq;
      let resp =await this.accountClient.GenerateToken(apiRequest);
      // let resp = this.getDummyTokenResp(tokenReq);
      if (!resp.isError && resp.successData != null) {
        this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD, rememberUser);
        if (rememberUser) {
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN, resp.successData.accessToken);
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.LOGIN_USER, resp.successData.loginUserDetails);
          this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE, tokenReq.companyCode);
        }
        else {
          this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN, resp.successData.accessToken);
          this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.LOGIN_USER, resp.successData.loginUserDetails);
          this.storageService.saveToSessionStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE, tokenReq.companyCode);
        }
      }
      return resp;
    }
  }
  getDummyTokenResp(req: TokenRequestSM): ApiResponse<TokenResponseSM> {
    // throw new Error('Method not implemented.');
    let resp: ApiResponse<TokenResponseSM> = new ApiResponse<TokenResponseSM>();
    let loginUserDetails: LoginUserSM = {
      roleType: RoleTypeSM.Unknown,
      loginId: req.loginId,
      firstName: 'Test First',
      middleName: 'Test Middle',
      lastName: 'Test Last',
      emailId: 'Test@test.test',
      isEmailConfirmed: false,
      passwordHash: '',
      phoneNumber: '',
      profilePicturePath: '',
      isPhoneNumberConfirmed: false,
      isLoginEnabled: true,
      dateOfBirth: new Date('01-12-2000'),
      id: 1,
      createdBy: '',
      lastModifiedBy: '',
      createdOnUTC: new Date()
    };
    let tokenresp: TokenResponseSM = { accessToken: 'thisistestaccesstoken', clientCompantId: 1, expiresUtc: new Date(), loginUserDetails: loginUserDetails };

    resp.axiosResponse = {};
    resp.isError = false;
    resp.responseStatusCode = 200;
    resp.successData = tokenresp;
    return resp;

  }


  async logoutUser() {
    try {
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.LOGIN_USER);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE);
      this.storageService.removeFromSessionStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD);
    }
    catch (err) {
      this.storageService.clearSessionStorage();
    }
    try {
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.ACCESS_TOKEN);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.LOGIN_USER);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.COMPANY_CODE);
      this.storageService.removeFromStorage(AppConstants.DATABASE_KEYS.REMEMBER_PWD);
    } catch (error) {
      this.storageService.clearStorage();
    }

  }
}
