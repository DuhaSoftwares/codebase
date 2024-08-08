import { InputControlInformation } from "./common-models";

export class BaseViewModel {
    PageTitle: string = '';
    PageNo?: number = 0;
    PageSize?: number = 10;
    FormSubmitted?: boolean;
    controlsInformation?: { [key: string]: InputControlInformation }

}



