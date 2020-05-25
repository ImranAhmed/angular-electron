import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { ngrxRuntimeChecks } from './shared/helpers/store-constants';
import { AppNavigation, User } from './shared/models';
import { LoggingMockService, LoggingService } from './shared/services';
import { appReducer } from './store/reducers/app.reducer';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent, SpinnerComponent],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }],
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
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the app', async(() => {
        expect(component).toBeTruthy();
    }));

    it('should not contain main container if no user details', () => {
        const elements = fixture.nativeElement.querySelectorAll('clr-main-container.main-container');

        expect(elements.length).toBe(0);
    });

    it('should not contain-container if no activeApp', () => {
        const elements = fixture.nativeElement.querySelectorAll('div.content-container');

        expect(elements.length).toBe(0);
    });

    describe('has user', () => {
        beforeEach(() => {
            component = fixture.componentInstance;
            component.user = {
                avatar: 'app-image-profile-tk',
                displayName: 'Tom Kennedy',
                clientCode: 'Some Client',
            } as User;
            component.isLoading = false;
            fixture.detectChanges();
        });

        it('should contain main container', () => {
            const elements = fixture.nativeElement.querySelectorAll('clr-main-container.main-container');

            expect(elements.length).toBe(1);
        });

        it('should contain header', () => {
            const elements = fixture.nativeElement.querySelectorAll('clr-header.header-6');

            expect(elements.length).toBe(1);
        });

        describe('header action menu', () => {
            it('should contain header actions', () => {
                const elements = fixture.nativeElement.querySelectorAll('div.header-actions');

                expect(elements.length).toBe(1);
            });

            it('should contain avatar', () => {
                const elements = fixture.nativeElement.querySelectorAll('div.avatar.app-image-profile-tk');

                expect(elements.length).toBe(1);
            });

            it('should contain header actions dropdowns', () => {
                const elements = fixture.nativeElement.querySelectorAll('clr-dropdown');

                expect(elements.length).toBe(1);
            });

            it('should contain button for triggering dropdown', () => {
                const elements = fixture.nativeElement.querySelectorAll('button.nav-text');

                expect(elements.length).toBe(1);
                expect(elements[0].innerText).toBe('Tom Kennedy | Some Client');
                expect(fixture.nativeElement.querySelectorAll('clr-icon').length).toBe(1);
            });

            it('should contain button for settings', () => {
                const elements = fixture.nativeElement.querySelectorAll('button.dropdown-item');

                expect(elements[0].innerText).toBe('settings_applications Settings');
            });

            it('should contain button for logout', () => {
                const elements = fixture.nativeElement.querySelectorAll('button.dropdown-item');

                expect(elements[1].innerText).toBe('exit_to_app Log Out');
            });

            it('should contain title for application details', () => {
                const elements = fixture.nativeElement.querySelectorAll('h4.dropdown-header');

                expect(elements[0].innerText).toBe('Application Details');
            });

            it('should contain version details', () => {
                const elements = fixture.nativeElement.querySelectorAll('div.dropdown-item.app-dropdown-text');

                expect(elements[0].innerText).toBe('Version: 0.0.1');
            });

            it('should contain release details', () => {
                const elements = fixture.nativeElement.querySelectorAll('div.dropdown-item.app-dropdown-text');

                expect(elements[1].innerText).toBe('Released: 24-May-2020');
            });
        });

        describe('has active app', () => {
            beforeEach(() => {
                component = fixture.componentInstance;
                component.activeApp = {
                    appName: 'App A',
                    id: 'app-a',
                    icon: 'objects',
                    href: '',
                    navigation: [],
                } as AppNavigation;
                component.isLoading = false;
                fixture.detectChanges();
            });

            it('should contain content-container', () => {
                const elements = fixture.nativeElement.querySelectorAll('div.content-container');

                expect(elements.length).toBe(1);
            });

            it('should contain vertical nav', () => {
                const elements = fixture.nativeElement.querySelectorAll('clr-vertical-nav');

                expect(elements.length).toBe(1);
            });

            describe('is loading', () => {
                beforeEach(() => {
                    component = fixture.componentInstance;
                    component.isLoading = true;
                    fixture.detectChanges();
                });

                it('should contain spinner as loading', () => {
                    const spinnerDirective = fixture.debugElement.query(By.directive(SpinnerComponent));

                    const spinnerrInstance = spinnerDirective.injector.get(SpinnerComponent);

                    expect(spinnerrInstance.isLoading).toBeTrue();
                });

                it('should not contain content area', () => {
                    expect(fixture.nativeElement.querySelectorAll('main.content-area').length).toEqual(0);
                });

                it('should not contain router outlet', () => {
                    expect(fixture.debugElement.queryAll(By.directive(RouterOutlet)).length).toEqual(0);
                });
            });

            describe('is not loading', () => {
                beforeEach(() => {
                    component = fixture.componentInstance;
                    component.isLoading = false;
                    fixture.detectChanges();
                });

                it('should not contain spinner as not loading', () => {
                    const spinnerDirective = fixture.debugElement.query(By.directive(SpinnerComponent));

                    const spinnerrInstance = spinnerDirective.injector.get(SpinnerComponent);

                    expect(spinnerrInstance.isLoading).toBeFalse();
                });

                it('should contain content area', () => {
                    expect(fixture.nativeElement.querySelectorAll('main.content-area').length).toEqual(1);
                });

                it('should contain router outlet', () => {
                    expect(fixture.debugElement.queryAll(By.directive(RouterOutlet)).length).toEqual(1);
                });
            });
        });
    });
});
