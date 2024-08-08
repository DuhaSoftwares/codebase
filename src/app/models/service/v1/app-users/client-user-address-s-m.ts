import { SampleServiceModelBase } from '../../base/sample-service-model-base';
import { ClientUserSM } from './client-user-s-m';

export class ClientUserAddressSM extends SampleServiceModelBase<Int32> {
    country!: string;
    state!: string;
    city!: string;
    address1!: string;
    address2!: string;
    pinCode!: string;
    clientUserId!: number;
    clientUser!: ClientUserSM;
}
