import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { AccountsClient } from '../clients/accounts.client';
import { BaseService } from './base.service';
import { ApiRequest } from '../models/service/api-contracts/base/api-request';
import { ApiResponse } from '../models/service/api-contracts/base/api-response';
import { RoleTypeSM } from '../models/service/enums/role-type-s-m.enum';
import { TokenRequestSM } from '../models/service/token/token-request-s-m';
import { TokenResponseSM } from '../models/service/token/token-response-s-m';

@Injectable({
  providedIn: 'root'
})
export class SampleService extends BaseService {

  constructor(private accountClient: AccountsClient) {
    super();
  }

  async generateToken(tokenReq: TokenRequestSM): Promise<ApiResponse<TokenResponseSM>> {
    if (tokenReq == null || tokenReq.loginId == null)// null checks
    {
      throw new Error(AppConstants.ERROR_PROMPTS.Invalid_Input_Data);
    }
    else {
      let apiRequest = new ApiRequest<TokenRequestSM>();
      tokenReq.companyCode = '123';
      tokenReq.roleType = RoleTypeSM.ClientAdmin;
      apiRequest.reqData = tokenReq
      return await this.accountClient.GenerateToken(apiRequest);
    }
  }
}
