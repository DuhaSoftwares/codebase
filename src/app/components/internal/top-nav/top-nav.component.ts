import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoleTypeSM } from 'src/app/models/service/enums/role-type-s-m.enum';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class TopNavComponent {

  protected _commonService: CommonService;
  constructor(commonService: CommonService) {
    this._commonService = commonService;
    //get the width if greater than specific set show true or false show menu will set as per requirements if menu enabled
    this._commonService.layoutViewModel = {
      showLeftMenu: true,
      showRightMenu: true,
      leftMenuClass: '',
      rightMenuClass: '',
      showNav: true,
      userLoggedIn: false,
      loggedInUserType: RoleTypeSM.Unknown
    }
  }

  click_ToggleRightMenu() {
    this._commonService.layoutViewModel.rightMenuClass = this._commonService.layoutViewModel.rightMenuClass == '' ? 'rightSideMenuToggle' : '';
  }

  click_ToggleLeftMenu() {
    this._commonService.layoutViewModel.leftMenuClass = this._commonService.layoutViewModel.leftMenuClass == '' ? 'leftSideMenuToggle' : '';
  }
  async click_Login() {

  }

  click_Register() {
  }

}
