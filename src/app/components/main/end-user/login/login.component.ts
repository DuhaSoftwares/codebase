import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/app-constants';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';
import { BaseComponent } from '../../../base.component';
import { TokenRequestSM } from 'src/app/models/service/token/token-request-s-m';
import { LoginViewModel } from 'src/app/models/view/end-user/login.viewmodel';
import { RoleTypeSM } from 'src/app/models/service/enums/role-type-s-m.enum';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent<LoginViewModel> implements OnInit {

  /**
   *
   */
  constructor(commonService: CommonService, logService: LogHandlerService,
    private accountService: AccountService, private router: Router) {
    super(commonService, logService);

  }

  async ngOnInit() {
    this.viewModel = new LoginViewModel();
    this.viewModel.tokenRequest = new TokenRequestSM();
    this.viewModel.rolesList = [
      { key: RoleTypeSM.ClientAdmin, value: this._commonService.singleEnumToString(RoleTypeSM, RoleTypeSM.ClientAdmin) },
      { key: RoleTypeSM.ClientEmployee, value: this._commonService.singleEnumToString(RoleTypeSM, RoleTypeSM.ClientEmployee) },
    ];
  }


  async login(signInForm: NgForm) {
    if (signInForm.invalid) {
      this.markAllControlsAsTouched(signInForm);
      return;
    }
    try {
      await this._commonService.presentLoading();
      let resp = await this.accountService.generateToken(this.viewModel.tokenRequest, false);
      if (resp.isError) {
        await this._commonService.showSweetAlertToast({
          icon: 'error',
          title: 'Error!', text: resp.errorData.displayMessage
        });
      }
      else {
        if (resp.successData && resp.successData.accessToken)
          this.router.navigate([AppConstants.WEB_ROUTES.ENDUSER.TEACHERS]);
        else
          await this._commonService.showSweetAlertToast({
            icon: 'error',
            title: 'Error!', text: 'Error message, set common error messages in Appconstants.'
          });
      }
    } catch (error) {
      await this._commonService.showSweetAlertToast({
        icon: 'error',
        title: 'Error!', text: 'Error message, set common error messages in Appconstants.'
      });
    } finally {
      await this._commonService.dismissLoader();
    }

  }

  async presentAlert() {
  //   this._commonService.presentConfirmAlert({
  //     title: 'Test',
  //     subTitle: 'Test Sub',
  //     message: 'Test Message',
  //     showModal: true
  //   }).then(
  //     (result) => {
  //       //means true or false
  //       console.log(result);
  //     },
  //     (reason) => {
  //       // means backdrop pressed
  //       console.log(reason)
  //     },)

  }
}
