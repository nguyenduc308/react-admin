import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../constants/auth';

const initialState = {
    isAuth: false,
    error: false,
    token: null,
};
export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.payload.token,
                user: action.payload.user,
                error: false,
            };
        case LOGIN_FAILED:
            return {
                ...initialState,
                error: true,
            };
        case LOGOUT: {
            return {
                ...initialState,
            };
        }
        default:
            return state;
    }
};
