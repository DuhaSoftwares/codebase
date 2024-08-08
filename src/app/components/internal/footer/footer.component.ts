import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'footer-nav',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone:true,
  imports: [
    CommonModule,
  ],
})
export class FooterComponent {
  protected _commonService: CommonService;
  constructor(commonService: CommonService) {
    this._commonService = commonService;
  }
}
