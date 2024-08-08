import { LoginUserSM } from './login/login-user-s-m';
import { GenderSM } from '../../enums/gender-s-m.enum';
import { ClientUserAddressSM } from './client-user-address-s-m';
import { ClientCompanyDetailSM } from '../client/client-company-detail-s-m';

export class ClientUserSM extends LoginUserSM {
    gender!: GenderSM;
    personalEmailId!: string;
    clientUserAddressId?: number;
    clientUserAddress!: ClientUserAddressSM;
    clientCompanyDetailId!: number;
    clientCompanyDetail!: ClientCompanyDetailSM;
}
