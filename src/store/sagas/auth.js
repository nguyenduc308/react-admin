import { call, put, cancel, take, fork } from 'redux-saga/effects';
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

export function* fetchLogin(credentials) {
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

export function* autoAuthenticate() {
    while (true) {
        const action = yield take(AUTO_LOGIN);
        const decoded = jwt_decode(action.payload);
        const isExpired = decoded * 1000 <= Date.now();
        if (isExpired) {
            yield put({
                type: LOGOUT,
            });
        } else {
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

export function* loginFlow() {
    while (true) {
        const data = yield take(LOGIN_REQUEST);
        const task = yield fork(fetchLogin, data.payload);
    }
}
