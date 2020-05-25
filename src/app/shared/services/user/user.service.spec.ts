import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { User } from '../../models';
import { LoggingService } from '../logging/logging.service';
import { LoggingMockService } from './../logging/logging-mock.service';
import { UserService } from './user.service';

describe('UserService', () => {
    let svc: UserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: LoggingService, useValue: new LoggingMockService() }, UserService],
        });
        svc = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(svc).toBeTruthy();
    });

    describe('getUser', () => {
        it('should return a user', inject(
            // Arrange
            [UserService, HttpTestingController],
            (userSvc: UserService, mockBackend: HttpTestingController) => {
                const mockResponse: User = {
                    avatar: 'app-image-profile-ab',
                    displayName: 'Alexis Besse',
                    clientCode: 'Qbridge',
                } as User;

                // Act
                userSvc.getUser().subscribe((user) => {
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
