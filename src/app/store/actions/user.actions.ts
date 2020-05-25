import { Action } from '@ngrx/store';
import { User } from './../../shared/models/user';

export enum UserActionTypes {
    GetUser = '[USER] Get User',
    GetUserSuccess = '[USER] Get User Success',
}

export class GetUser implements Action {
    public readonly type = UserActionTypes.GetUser;
}
export class GetUserSuccess implements Action {
    public readonly type = UserActionTypes.GetUserSuccess;
    constructor(public payload: User) {}
}

export type UserActions = GetUser | GetUserSuccess;
