import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './../../shared/models/user';
import { UserService } from './../../shared/services';
import { GetUser, GetUserSuccess, UserActionTypes } from './../actions/user.actions';

@Injectable()
export class UserEffect {
    @Effect()
    getUser$ = this.actions.pipe(
        ofType<GetUser>(UserActionTypes.GetUser),
        switchMap(() => this.userSvc.getUser()),
        switchMap((user: User) => {
            return of(new GetUserSuccess(user));
        })
    );

    constructor(private readonly userSvc: UserService, private readonly actions: Actions) {}
}
