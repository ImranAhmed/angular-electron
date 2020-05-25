import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { LoggingService } from '../logging/logging.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private readonly http: HttpClient, private readonly logger: LoggingService) {}

    getUser(): Observable<User> {
        this.logger.info(this, 'getUser');

        return this.http.get<User>(`/assets/data/user.json`);
    }
}
