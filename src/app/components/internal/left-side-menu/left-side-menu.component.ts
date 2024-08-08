import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'left-side-menu',
  templateUrl: './left-side-menu.component.html',
  styleUrls: ['./left-side-menu.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
  ],
})
export class LeftSideMenuComponent {
  protected _commonService: CommonService;

  constructor(commonService: CommonService) {
    this._commonService = commonService;
  }
}
