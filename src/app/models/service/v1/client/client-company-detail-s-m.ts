import { SampleServiceModelBase } from '../../base/sample-service-model-base';

export class ClientCompanyDetailSM extends SampleServiceModelBase<Int32> {
    companyCode!: string;
    name!: string;
    description!: string;
    contactEmail!: string;
    companyMobileNumber!: string;
    companyWebsite!: string;
    companyDateOfEstablishment!: Date;
    clientCompanyAddressId!: number;
}
