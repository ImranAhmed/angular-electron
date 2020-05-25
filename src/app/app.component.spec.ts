import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ngrxRuntimeChecks } from './shared/helpers/store-constants';
import { CoreService, ElectronService, LoggingMockService, LoggingService } from './shared/services';
import { appReducer } from './store/reducers/app.reducer';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, SpinnerComponent],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }, ElectronService, CoreService],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot(),
                StoreModule.forRoot(appReducer, {
                    runtimeChecks: {
                        ...ngrxRuntimeChecks,
                    },
                }),
            ],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
