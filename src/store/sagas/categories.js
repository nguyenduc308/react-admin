import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { createCategoryApi, getCategoriesApi } from '../../apis/categories';
import {
    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
} from '../constants/categories';

function* fetchGetCategories() {
    try {
        const { categories } = yield call(getCategoriesApi);
        yield put({
            type: GET_CATEGORIES_SUCCESS,
            payload: categories,
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

function* fetchCreateCategory(values) {
    try {
        const category = yield call(createCategoryApi, values);
        yield put({
            type: CREATE_CATEGORY_SUCCESS,
            payload: category,
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

export function* getCategoriesWatch() {
    while (true) {
        yield take(GET_CATEGORIES_REQUEST);
        yield fork(fetchGetCategories);
    }
}
export function* createCategoryWatch() {
    while (true) {
        const data = yield take(CREATE_CATEGORY_REQUEST);
        yield fork(fetchCreateCategory, data.payload);
    }
}
