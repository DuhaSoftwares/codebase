import { Injectable } from "@angular/core";
import { AppConstants } from "src/app/app-constants";
import { AdditionalRequestDetails, Authentication } from "../models/internal/additional-request-details";
import { BaseApiClient } from "./base-client/base-api.client";
import { CommonResponseCodeHandler } from "./helpers/common-response-code-handler.helper";
import { StorageCache } from "./helpers/storage-cache.helper";
import { ApiRequest } from "../models/service/api-contracts/base/api-request";
import { ApiResponse } from "../models/service/api-contracts/base/api-response";
import { TokenRequestSM } from "../models/service/token/token-request-s-m";
import { TokenResponseSM } from "../models/service/token/token-response-s-m";
import { StorageService } from "../services/storage.service";

@Injectable({
    providedIn: 'root'
})
export class AccountsClient extends BaseApiClient {
    constructor(storageService: StorageService, storageCache: StorageCache,
        commonResponseCodeHandler: CommonResponseCodeHandler) {
        super(storageService, storageCache, commonResponseCodeHandler)
    }
    GenerateToken = async (tokenRequestSM: ApiRequest<TokenRequestSM>): Promise<ApiResponse<TokenResponseSM>> => {
        let resp = await this.GetResponseAsync<TokenRequestSM, TokenResponseSM>
            (`${AppConstants.API_ENDPOINTS.ACCOUNT_URL}/ValidateLoginAndGenerateToken`, 'POST', tokenRequestSM,
                new AdditionalRequestDetails<TokenResponseSM>(false, Authentication.false));
        return resp;
    }

}
