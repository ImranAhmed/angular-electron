import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { userReducer } from './user.reducer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const appReducer: ActionReducerMap<AppState, any> = {
    userState: userReducer,
};
