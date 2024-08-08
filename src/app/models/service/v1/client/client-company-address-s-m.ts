import { SampleServiceModelBase } from '../../base/sample-service-model-base';

export class ClientCompanyAddressSM extends SampleServiceModelBase<Int32> {
    country!: string;
    state!: string;
    city!: string;
    address1!: string;
    address2!: string;
    pinCode!: string;
    clientCompanyDetailId!: number;
}
