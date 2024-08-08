import { LoginUserSM } from './login/login-user-s-m';
import { ApplicationUserAddressSM } from './application-user-address-s-m';

export class ApplicationUserSM extends LoginUserSM {
    applicationUserAddressId?: number;
    applicationUserAddress!: ApplicationUserAddressSM;
}
