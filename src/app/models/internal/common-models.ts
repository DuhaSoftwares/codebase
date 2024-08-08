import { RoleTypeSM } from "../service/enums/role-type-s-m.enum";

export interface LoaderInfo {
  message: string;
  showLoader: boolean;
}


// export interface ConfirmModalInfo {
//   title: string;
//   subTitle: string;
//   message: string;
//   showModal: boolean;
// }


export interface LayoutViewModel {
  leftMenuClass: string;
  rightMenuClass: string;
  showRightMenu: boolean;
  showLeftMenu: boolean;
  showNav: boolean;
  userLoggedIn: boolean;
  loggedInUserType: RoleTypeSM;

}



export interface MenuItem {
  routePath: string;
  routeName: string;
  isActive: boolean;
  iconName: boolean;
}



export interface InputControlInformation {
  controlName: string;
  hasError: boolean;
  placeHolder: string;
  errorMessage: string;
  isRequired: boolean;
  pattern?: string;
  maxlength?: number;
  minlength?: number;
  validations: ValidationMessageInformation[];
}

export interface ValidationMessageInformation {
  type: string;
  message: string;
}




