import { fork } from 'redux-saga/effects';
import { autoAuthenticateWatch, loginWatch, logoutWatch } from './auth';
import { createCategoryWatch, getCategoriesWatch } from './categories';
import { getPostsWatch, createPostWatch, getPostBySlugWatch } from './posts';

export function* rootSaga() {
    // Authentication
    yield fork(autoAuthenticateWatch);
    yield fork(loginWatch);
    yield fork(logoutWatch);

    // Categories
    yield fork(getCategoriesWatch);
    yield fork(createCategoryWatch);

    yield fork(getPostsWatch);
    yield fork(createPostWatch);
    yield fork(getPostBySlugWatch);
}
