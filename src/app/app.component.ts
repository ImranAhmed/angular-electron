import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { application } from '../environments/application';
import { environment } from '../environments/environment';
import { CoreService } from './core/core.service';
import { AppNavigation, User } from './shared/models';
import { ElectronService, LoggingService } from './shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    navigationMenu: AppNavigation[];
    activeApp: AppNavigation;
    activeAppId: string;
    activeModuleId: string;
    activeUrl: string;
    user: User;
    isLoading = true;
    version: string;
    releaseDate: string;

    private readonly unsubscribe: Subject<void> = new Subject();

    constructor(
        public electronSvc: ElectronService,
        private readonly translate: TranslateService,
        private readonly logger: LoggingService,
        private readonly coreSvc: CoreService
    ) {}

    ngOnInit(): void {
        this.logger.info(this, 'ngOnInit');

        this.version = application.version;

        this.releaseDate = application.releaseDate;

        this.config();
        this.getData();
    }

    getData(): void {
        this.logger.info(this, 'getData');

        const getUser = this.coreSvc.getUser();
        const getNavigationMenu = this.coreSvc.getNavigationMenu();

        forkJoin([getNavigationMenu, getUser])
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                (res) => {
                    this.navigationMenu = res[0];
                    this.user = res[1];

                    this.activeApp = this.navigationMenu[0];
                    this.activeAppId = this.activeApp.id;
                    this.isLoading = false;
                },
                (error) => {
                    this.logger.error(this, `${error}`);
                    this.isLoading = false;
                }
            );
    }

    ngOnDestroy(): void {
        this.logger.info(this, 'ngOnDestroy');

        this.unsubscribe.next();

        this.unsubscribe.complete();
    }

    private config(): void {
        this.translate.setDefaultLang('en');
        this.logger.info(this, `environment:${JSON.stringify(environment)}`);

        if (this.electronSvc.isElectron) {
            this.logger.info(this, 'Mode electron');
        } else {
            this.logger.info(this, 'Mode web');
        }
    }
}
