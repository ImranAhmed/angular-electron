import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { application } from '../environments/application';
import { environment } from '../environments/environment';
import { AppNavigation } from './shared/models';
import { User } from './shared/models/user';
import { ElectronService, LoggingService, NavigationService } from './shared/services';
import { GetUser } from './store/actions/user.actions';
import { selectUser } from './store/selectors/user.selector';
import { AppState } from './store/state/app.state';

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
    isLoading = true;
    version: string;
    releaseDate: string;
    user: User;

    private readonly unsubscribe: Subject<void> = new Subject();

    constructor(
        public electronSvc: ElectronService,
        private readonly translate: TranslateService,
        private readonly logger: LoggingService,
        private readonly navSvc: NavigationService,
        private readonly store: Store<AppState>
    ) {}

    ngOnInit(): void {
        this.logger.info(this, 'ngOnInit');

        this.version = application.version;

        this.releaseDate = application.releaseDate;

        this.configureLanguage();

        this.configureStore();

        this.getData();
    }

    configureStore(): void {
        this.logger.info(this, 'configureStore');

        this.store.dispatch(new GetUser());

        this.store.pipe(takeUntil(this.unsubscribe), select(selectUser)).subscribe((user: User) => {
            this.user = user;
        });
    }

    getData(): void {
        this.logger.info(this, 'getData');

        this.navSvc
            .getNavigationMenu()
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(
                (res) => {
                    this.navigationMenu = res;

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

    private configureLanguage(): void {
        this.logger.info(this, 'configureLanguage');

        this.logger.info(this, `environment:${JSON.stringify(environment)}`);

        this.translate.setDefaultLang('en');

        if (this.electronSvc.isElectron) {
            this.logger.info(this, 'Mode electron');
        } else {
            this.logger.info(this, 'Mode web');
        }
    }
}
