import { call, put, cancel, take, fork, delay } from 'redux-saga/effects';
import {
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    AUTO_LOGIN,
    LOGOUT,
} from '../constants/auth';
import jwt_decode from 'jwt-decode';
import { loginApi } from '../../apis/auth';
import { LOCAL_TOKEN } from '../../const/keys';
let timerId;

function* fetchLogin(credentials) {
    try {
        const { data } = yield call(loginApi, credentials);
        const decoded = jwt_decode(data.jwt);
        localStorage.setItem(LOCAL_TOKEN, data.jwt);
        yield put({
            type: LOGIN_SUCCESS,
            payload: {
                token: data.jwt,
                user: decoded,
            },
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({
                type: LOGIN_FAILED,
            });
        }
    }
}
function setupSectionLogin(exp) {
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(function* () {
        yield put({
            type: LOGOUT,
        });
    }, exp);
}

export function* autoAuthenticateWatch() {
    while (true) {
        const action = yield take(AUTO_LOGIN);
        const decoded = jwt_decode(action.payload);
        const isExpired = decoded.exp * 1000 <= Date.now();
        console.log('Is token expired: ', isExpired);
        if (isExpired) {
            yield put({
                type: LOGOUT,
            });
            localStorage.removeItem(LOCAL_TOKEN);
        } else {
            setupSectionLogin(decoded.exp);
            yield delay(600);
            yield put({
                type: LOGIN_SUCCESS,
                payload: {
                    token: action.payload,
                    user: decoded,
                },
            });
        }
    }
}

export function* logoutWatch() {
    while (true) {
        yield take(LOGOUT);
        localStorage.removeItem(LOCAL_TOKEN);
    }
}

export function* loginWatch() {
    while (true) {
        const data = yield take(LOGIN_REQUEST);
        yield fork(fetchLogin, data.payload);
    }
}
