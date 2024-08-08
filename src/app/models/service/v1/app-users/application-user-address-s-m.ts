import { SampleServiceModelBase } from '../../base/sample-service-model-base';
import { ApplicationUserSM } from './application-user-s-m';

export class ApplicationUserAddressSM extends SampleServiceModelBase<Int32> {
    country!: string;
    state!: string;
    city!: string;
    address1!: string;
    address2!: string;
    pinCode!: string;
    applicationUserId!: number;
    applicationUser!: ApplicationUserSM;
}
