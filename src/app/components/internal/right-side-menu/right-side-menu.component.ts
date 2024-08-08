import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'right-side-menu',
  templateUrl: './right-side-menu.component.html',
  styleUrls: ['./right-side-menu.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
  ],
})
export class RightSideMenuComponent {
  protected _commonService: CommonService;

  constructor(commonService: CommonService) {
    this._commonService = commonService;
  }


}
