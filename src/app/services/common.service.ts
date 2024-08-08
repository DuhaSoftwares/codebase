import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { LayoutViewModel, LoaderInfo } from '../models/internal/common-models';
import { SweetAlertOptions } from '../models/internal/custom-sweet-alert-options';
declare var Swal: any;
@Injectable({
  providedIn: 'root'
})
export class CommonService extends BaseService {

  layoutViewModel!: LayoutViewModel
  loaderInfo: LoaderInfo = { message: '', showLoader: false };
  constructor() {
    super();
  }


  async presentLoading(message: string = '') {
    this.loaderInfo = { message, showLoader: true };
  }

  
  async presentAlert() {

  }

  /**Show custom sweet alert*/
  async showSweetAlertConfirmation(alertOptions: SweetAlertOptions) {
    // alertOptions.toast = false;
    return (await Swal.fire(alertOptions));
  }

  /** Show a toast message as per options
   * @argument alertOptions Contains the properties of sweet alert like position, timer, text, title etc  */
  async showSweetAlertToast(alertOptions: SweetAlertOptions) {
    alertOptions.toast = true;
    if (!alertOptions.position)
      alertOptions.position = "bottom";
    if (!alertOptions.showConfirmButton)
      alertOptions.showConfirmButton = false;
    if (!alertOptions.timer)
      alertOptions.timer = 3000;
    if (!alertOptions.timerProgressBar)
      alertOptions.timerProgressBar = true;
    alertOptions.didOpen = (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    };
    return await Swal.fire(alertOptions);
  }


  async dismissLoader() {
    this.loaderInfo.showLoader = false;
    this.loaderInfo.message = '';
  }


  /**Change Enum value  to string Array*/
  enumToStringArray(enumType: any) {
    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
    return Object.keys(enumType)
      .filter(StringIsNumber)
      .map((key) => enumType[key]);
  }

  /**Change Enum value to string*/
  singleEnumToString(enumme: any, selectedValue: any) {
    const StringIsNumber = (value: any) => isNaN(Number(value)) === false;
    var x = Object.keys(enumme)
      .filter(StringIsNumber)
      .map((key) => enumme[key])[selectedValue];
    return x;
  }
}
