import { AxiosResponse } from 'axios';
import { ApiResponse } from '../service/api-contracts/base/api-response';
import { IDictionaryCollection } from './Idictionary-collection';


export enum Authentication {
    true,
    false
}
export class AdditionalRequestDetails<OutResp> {

    constructor(useCacheIfPossible: boolean, enableAuth: Authentication = Authentication.true) {
        this.useCacheIfPossible = useCacheIfPossible;
        this.enableAuth = enableAuth;
    }
    enableAuth = Authentication.true;
    useCacheIfPossible = false;
    forceGetResponseFromApi = false;
    headers: IDictionaryCollection<string, string> | null = null;
    contentType = 'application/json';
    custRespResolver: ((resp: AxiosResponse) => ApiResponse<OutResp>) | null = null;
}
