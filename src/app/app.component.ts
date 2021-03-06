import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { ElectronService, LoggingService } from './shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        public electronService: ElectronService,
        private readonly translate: TranslateService,
        private readonly logger: LoggingService
    ) {
        this.config();
    }

    private config(): void {
        this.translate.setDefaultLang('en');
        this.logger.info(this, `environment:${JSON.stringify(environment)}`);

        if (this.electronService.isElectron) {
            this.logger.info(this, 'Mode electron');
        } else {
            this.logger.info(this, 'Mode web');
        }
    }
}
