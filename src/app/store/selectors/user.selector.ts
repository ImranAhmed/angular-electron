import { createSelector } from '@ngrx/store';
import { AppState } from './../state/app.state';
import { UserState } from './../state/user.state';

const userState = (state: AppState): UserState => state.userState;

export const selectUser = createSelector(userState, (state: UserState) => {
    return state.user;
});
