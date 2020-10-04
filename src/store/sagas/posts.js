import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { createPostApi, getPostBySlugApi, getPostsApi } from '../../apis/posts';
import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POST_BY_SLUG_REQUEST,
    GET_POST_BY_SLUG_SUCCESS,
} from '../constants/posts';

function* fetchGetPosts() {
    try {
        const data = yield call(getPostsApi);
        yield put({
            type: GET_POSTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

function* fetchGetPostBySlug(slug) {
    try {
        const data = yield call(getPostBySlugApi, slug);
        yield put({
            type: GET_POST_BY_SLUG_SUCCESS,
            payload: data,
        });
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

function* fetchCreatePost(values) {
    try {
        const { data } = yield call(createPostApi, values);
        yield put({
            type: CREATE_POST_SUCCESS,
            payload: data.res,
        });
        console.log(data);
    } catch (error) {
        if (yield cancel()) {
            yield put({});
        }
    }
}

export function* getPostsWatch() {
    while (true) {
        yield take(GET_POSTS_REQUEST);
        yield fork(fetchGetPosts);
    }
}

export function* getPostBySlugWatch() {
    while (true) {
        const data = yield take(GET_POST_BY_SLUG_REQUEST);
        yield fork(fetchGetPostBySlug, data.payload);
    }
}

export function* createPostWatch() {
    while (true) {
        const data = yield take(CREATE_POST_REQUEST);
        yield fork(fetchCreatePost, data.payload);
    }
}
