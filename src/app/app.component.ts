import { Component, ErrorHandler } from '@angular/core';
import { CommonService } from './services/common.service';
import { BaseComponent } from './components/base.component';
import { AppViewModel } from './models/view/app.viewmodel';
import { LogHandlerService } from './services/log-handler.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent<AppViewModel> {

  showToast: boolean = false;

  constructor(commonService: CommonService,logService:LogHandlerService) {
    super(commonService,logService)
  }

}
