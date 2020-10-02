import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { createCategoryApi, getCategoriesApi } from '../../apis/categories';
import {
    CREATE_CATEGORY_REQUEST,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
} from '../constants/categories';

export function* fetchGetCategories() {
    try {
        const { data } = yield call(getCategoriesApi);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: data.res.categories,
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

export function* fetchCreateCategory(values) {
    console.log(values);
    try {
        const { data } = yield call(createCategoryApi, values);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: data.res,
        });
        console.log(data);
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

export function* getCategoriesFlow() {
    while (true) {
        yield take(GET_CATEGORIES_REQUEST);
        yield fork(fetchGetCategories);
    }
}
export function* createCategoryFlow() {
    while (true) {
        const data = yield take(CREATE_CATEGORY_REQUEST);
        console.log(data);
        yield fork(fetchCreateCategory, data.payload);
    }
}
