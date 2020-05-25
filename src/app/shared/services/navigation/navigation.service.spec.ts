import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { AppNavigation } from '../../models';
import { LoggingMockService } from '../logging/logging-mock.service';
import { LoggingService } from '../logging/logging.service';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
    let svc: NavigationService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }],
        });
        svc = TestBed.inject(NavigationService);
    });

    it('should be created', () => {
        expect(svc).toBeTruthy();
    });

    describe('getNavigation', () => {
        it('should return a navigation menu', inject(
            // Arrange
            [NavigationService, HttpTestingController],
            (navSvc: NavigationService, mockBackend: HttpTestingController) => {
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
                navSvc.getNavigationMenu().subscribe((menu) => {
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
});
