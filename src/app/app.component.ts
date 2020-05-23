import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppConfig } from '../environments/environment';
import { ElectronService, LoggingService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public electronService: ElectronService,
    private readonly translate: TranslateService,
    private readonly logger: LoggingService
  ) {
    this.translate.setDefaultLang('en');
    this.logger.info(this, `AppConfig:${JSON.stringify(AppConfig)}`);

    if (electronService.isElectron) {
      this.logger.info(this, 'Mode electron');
    } else {
      this.logger.info(this, 'Mode web');
    }
  }
}
