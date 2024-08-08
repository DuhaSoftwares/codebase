import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
  ],
})
export class SpinnerComponent {
  protected _commonService: CommonService;
  constructor(commonService: CommonService) {
    this._commonService = commonService;
  }
}
