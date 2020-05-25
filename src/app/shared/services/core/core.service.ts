import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNavigation, User } from '../../models';
import { LoggingService } from '../../services';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    constructor(private readonly http: HttpClient, private readonly logger: LoggingService) {}

    getNavigationMenu(): Observable<AppNavigation[]> {
        this.logger.info(this, 'getNavigationMenu');

        return this.http.get<AppNavigation[]>(`/assets/navigation/menu.json`);
    }

    getUser(): Observable<User> {
        this.logger.info(this, 'getUser');

        return this.http.get<User>(`/assets/data/user.json`);
    }
}
