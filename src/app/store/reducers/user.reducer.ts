import { UserActions, UserActionTypes } from '../actions/user.actions';
import { initialUserState, UserState } from '../state/user.state';

export const userReducer = (state = initialUserState, action: UserActions): UserState => {
    switch (action.type) {
        case UserActionTypes.GetUserSuccess: {
            return {
                ...state,
                user: action.payload,
            };
        }

        default:
            return state;
    }
};
