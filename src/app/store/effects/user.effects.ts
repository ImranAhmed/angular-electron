import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../../shared/models/user';
import { CoreService } from './../../shared/services/core/core.service';
import { GetUser, GetUserSuccess, UserActionTypes } from './../actions/user.actions';

@Injectable()
export class UserEffect {
    @Effect()
    getUser$ = this.actions.pipe(
        ofType<GetUser>(UserActionTypes.GetUser),
        switchMap(() => this.coreSvc.getUser()),
        switchMap((user: User) => {
            return of(new GetUserSuccess(user));
        })
    );

    constructor(private readonly coreSvc: CoreService, private readonly actions: Actions) {}
}
