import { initialUserState, UserState } from './user.state';

export interface AppState {
    userState: UserState;
}

export const initialAppState: AppState = {
    userState: initialUserState,
};
