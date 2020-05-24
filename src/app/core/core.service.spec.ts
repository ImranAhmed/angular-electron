import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AppNavigation, User } from '../shared/models';
import { LoggingMockService, LoggingService } from '../shared/services';
import { CoreService } from './core.service';

describe('CoreService', () => {
    let svc: CoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }],
        });
        svc = TestBed.inject(CoreService);
    });

    it('should be created', () => {
        expect(svc).toBeTruthy();
    });

    describe('getNavigation', () => {
        it('should return a navigation menu', inject(
            // Arrange
            [CoreService, HttpTestingController],
            (coreSvc: CoreService, mockBackend: HttpTestingController) => {
                const mockResponse: AppNavigation[] = [
                    {
                        appName: 'App A',
                        id: 'app-a',
                        icon: 'objects',
                        href: '',
                        navigation: [],
                    } as AppNavigation,
                ];

                // Act
                coreSvc.getNavigationMenu().subscribe((menu) => {
                    // Assert
                    expect(menu.length).toBe(1);
                    expect(menu).toEqual(mockResponse);
                });

                const req = mockBackend.expectOne(`/assets/navigation/menu.json`);
                expect(req.request.method).toBe('GET');
                req.flush(mockResponse);
            }
        ));
    });

    describe('getUser', () => {
        it('should return a user', inject(
            // Arrange
            [CoreService, HttpTestingController],
            (coreSvc: CoreService, mockBackend: HttpTestingController) => {
                const mockResponse: User = {
                    avatar: 'qb-image-profile-ab',
                    displayName: 'Alexis Besse',
                    clientCode: 'Qbridge',
                } as User;

                // Act
                coreSvc.getUser().subscribe((user) => {
                    // Assert
                    expect(user).toBeDefined();
                    expect(user).toEqual(mockResponse);
                });

                const req = mockBackend.expectOne(`/assets/data/user.json`);
                expect(req.request.method).toBe('GET');
                req.flush(mockResponse);
            }
        ));
    });
});
