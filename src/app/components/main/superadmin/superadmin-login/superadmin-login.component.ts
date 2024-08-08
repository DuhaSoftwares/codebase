import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app-constants';
import { BaseComponent } from 'src/app/components/base.component';
import { RoleTypeSM } from 'src/app/models/service/enums/role-type-s-m.enum';
import { TokenRequestSM } from 'src/app/models/service/token/token-request-s-m';
import { SuperadminLoginViewmodel } from 'src/app/models/view/superadmin/superadmin-login.viewmodel';
import { AccountService } from 'src/app/services/account.service';
import { CommonService } from 'src/app/services/common.service';
import { LogHandlerService } from 'src/app/services/log-handler.service';

@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.scss']
})
export class SuperadminLoginComponent extends BaseComponent<SuperadminLoginViewmodel> implements OnInit {


  constructor(
    commonService: CommonService,
    logService: LogHandlerService,
    private accountService: AccountService,
    private router: Router,
  ) {
    super(commonService, logService)
    this.viewModel = new SuperadminLoginViewmodel();
    this.viewModel.tokenRequest = new TokenRequestSM();
    this.viewModel.rolesList = [
      { key: RoleTypeSM.SuperAdmin, value: this._commonService.singleEnumToString(RoleTypeSM, RoleTypeSM.SuperAdmin) },
      { key: RoleTypeSM.SystemAdmin, value: this._commonService.singleEnumToString(RoleTypeSM, RoleTypeSM.SystemAdmin) },
    ];
  }

  ngOnInit() {

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
          title: 'Error!', text: 'Error message, set common error messages in Appconstants.'
        });
      }
      // redirect to dashboard
      this.router.navigate([AppConstants.WEB_ROUTES.SUPERADMIN.DASHBOARD]);

    } catch (error) {
      throw error;
    } finally {
      await this._commonService.dismissLoader();
    }

  }
}
