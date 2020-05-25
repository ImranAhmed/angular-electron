import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppNavigation } from '../../models';
import { LoggingService } from '../logging/logging.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    constructor(private readonly http: HttpClient, private readonly logger: LoggingService) {}

    getNavigationMenu(): Observable<AppNavigation[]> {
        this.logger.info(this, 'getNavigationMenu');

        return this.http.get<AppNavigation[]>(`/assets/navigation/menu.json`);
    }
}
