import { SampleServiceModelBase } from '../../../base/sample-service-model-base';
import { RoleTypeSM } from '../../../enums/role-type-s-m.enum';

export abstract class LoginUserSM extends SampleServiceModelBase<number> {
    roleType!: RoleTypeSM;
    loginId!: string;
    firstName!: string;
    middleName!: string;
    lastName!: string;
    emailId!: string;
    isEmailConfirmed!: boolean;
    passwordHash!: string;
    phoneNumber!: string;
    profilePicturePath!: string;
    isPhoneNumberConfirmed!: boolean;
    isLoginEnabled!: boolean;
    dateOfBirth!: Date;
}
