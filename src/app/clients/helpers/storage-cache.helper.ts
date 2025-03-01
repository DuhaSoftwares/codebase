import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { AdditionalRequestDetails } from '../../models/internal/additional-request-details';
import { Method } from 'axios';
import { StorageService } from 'src/app/services/storage.service';
import { AppConstants } from 'src/app/app-constants';
import * as Flatted from 'flatted';
import { CommonLogger } from './common-logger.helper';
import { CacheItem } from 'src/app/models/internal/cache-item';
import { ApiResponse } from 'src/app/models/service/api-contracts/base/api-response';


@Injectable({
    providedIn: 'root'
})
export class StorageCache {//dont extend from base
    constructor(private storageService: StorageService) {
    }

    public GetResponseFromDbIfPresent = async<OutResp>(fullUrlToHit: string,
        reqMethod: Method, additionalRequestDetails: AdditionalRequestDetails<OutResp>)
        : Promise<ApiResponse<OutResp> | null> => {
        if (!environment.enableResponseCacheProcessing)
            return null;
        if (additionalRequestDetails.useCacheIfPossible && !additionalRequestDetails.forceGetResponseFromApi
            && reqMethod === 'GET') {
            let cacheItem = await this.GetCacheItemIfPresent<ApiResponse<OutResp>>(fullUrlToHit);
            if (cacheItem != null) {
                return cacheItem;
            }
        }
        return null;
    }

    public AddOrUpdateResponseInCacheIfApplicable = async<OutResp>(fullUrlToHit: string,
        reqMethod: Method, additionalRequestDetails: AdditionalRequestDetails<OutResp>, responseEntity: ApiResponse<OutResp>)
        : Promise<boolean> => {
        if (!environment.enableResponseCacheProcessing)
            return false;
        if (additionalRequestDetails.useCacheIfPossible && reqMethod === 'GET'
            && responseEntity.axiosResponse?.status === 200 && !responseEntity.isError) {
            this.AddOrUpdateCacheItem<ApiResponse<OutResp>>(fullUrlToHit, responseEntity);
        }
        return false;
    }


    protected GetCacheItemIfPresent = async<T>(key: string): Promise<T | null> => {
        if (key == null)
            return null;
        let cacheMap = await this.GetMapFromDb();
        if (cacheMap.has(key)) {
            const cacheItem = cacheMap.get(key);
            if (cacheItem != null) {
                if (cacheItem.ValidUptoDateTimeTicks >= new Date().valueOf()) {
                    let item = cacheItem.Data as T;
                    if (environment.LoggingInfo.cacheLogs)
                        CommonLogger.LogTextOrObject(`StorageCache - Response Returned form cache -- '${key}'`);
                    return item;
                }
                else {
                    if (environment.LoggingInfo.cacheLogs)
                        CommonLogger.LogTextOrObject(`StorageCache - Cache object expired -- '${key}'`);
                }
            }
        }
        return null;
    }

    protected AddOrUpdateCacheItem = async<T>(key: string, data: T, cacheTimeout = 0): Promise<boolean> => {
        if (key != null && data != null) {
            let cacheMap: Map<string, CacheItem> | null = null;
            cacheMap = await this.GetMapFromDb();

            if (cacheMap.has(key)) {
                if (environment.LoggingInfo.cacheLogs)
                    CommonLogger.LogTextOrObject(`StorageCache - Old Key Deleted -- '${key}'`);
                cacheMap.delete(key);
            }
            this.RemoveExpiredKeys(cacheMap);
            const cacheItem = new CacheItem();
            let currDate = new Date();
            cacheItem.CreatedDateTimeTicks = currDate.valueOf();
            cacheTimeout = cacheTimeout === 0 ? environment.apiResponseCacheTimeoutInMinutes : cacheTimeout;
            currDate.setMinutes(currDate.getMinutes() + cacheTimeout);
            cacheItem.ValidUptoDateTimeTicks = currDate.valueOf();
            cacheItem.AccessKey = key;
            cacheItem.Data = data;
            cacheMap.set(key, cacheItem);

            if (environment.LoggingInfo.cacheLogs)
                CommonLogger.LogTextOrObject(`StorageCache - New Key Added -- '${key}'`);

            await this.SaveOrUpdateMapInDb(cacheMap);
            return true;
        }
        return false;
    }

    private RemoveExpiredKeys = (cacheMap: Map<string, CacheItem>): void => {

        if (cacheMap != null) {
            let keysToDel: Array<string> = [];
            cacheMap.forEach((item, key) => {
                if (item != null && item.ValidUptoDateTimeTicks <= new Date().valueOf())
                    keysToDel.push(key);
            });
            keysToDel.forEach(key => {
                if (environment.LoggingInfo.cacheLogs)
                    CommonLogger.LogTextOrObject(`StorageCache - Item deleted after expiry -- '${key}'`);
                cacheMap.delete(key);
            });
        }
    }

    private GetMapFromDb = async (): Promise<Map<string, CacheItem>> => {
        let cacheMap: Map<string, CacheItem> | null = null;
        let cacheMapTxt: string | null = await this.storageService.getFromStorage(AppConstants.DATABASE_KEYS.API_RESP_CACHE);
        if (cacheMapTxt != null && cacheMapTxt !== '')
            cacheMap = new Map<string, CacheItem>(Flatted.parse(cacheMapTxt));

        if (cacheMap != null && !(cacheMap instanceof Map))
            cacheMap = null;

        return cacheMap == null ? new Map<string, CacheItem>() : cacheMap;
    }

    private SaveOrUpdateMapInDb = async (cacheMap: Map<string, CacheItem>): Promise<boolean> => {
        let cacheMapTxt = Flatted.stringify(Array.from(cacheMap.entries()));
        await this.storageService.saveToStorage(AppConstants.DATABASE_KEYS.API_RESP_CACHE, cacheMapTxt);
        return true;
    }
}

