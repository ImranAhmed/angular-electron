import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { CoreService } from './core/core.service';
import { ElectronService, LoggingMockService, LoggingService } from './shared/services';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }, ElectronService, CoreService],
            imports: [RouterTestingModule, HttpClientTestingModule, TranslateModule.forRoot()],
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
});
