import { LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT } from '../constants/auth';

const initialState = {
    isAuth: false,
    error: false,
    token: null,
    user: null,
    loading: true,
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
                loading: false,
            };
        case LOGIN_FAILED:
            return {
                ...initialState,
                error: true,
                loading: false,
            };
        case LOGOUT: {
            return {
                ...initialState,
                loading: false,
            };
        }
        default:
            return state;
    }
};
