export const environment = {
  production: true,
  apiResponseCacheTimeoutInMinutes: 5,
  enableResponseCacheProcessing: true,
  applicationVersion: '0.0.1',
  apiBaseUrl: 'localqa_url',
  apiDefaultTimeout: 10,
  LoggingInfo: {
    cacheLogs: false,
    cacheLogsToConsole: true,
    logToConsole: true,
    logToFile: false,
    logToApi: false,
    logToElasticCluster: false,
    exceptionToConsole: true,
    exceptionToFile: false,
    exceptionToApi: false,
    exceptionToElasticCluster: false,
    localLogFilePath: 'Sample.log',
  },
  encryptionKey: '12345678',

};
