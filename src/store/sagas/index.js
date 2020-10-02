import { fork } from 'redux-saga/effects';
import { autoAuthenticate, loginFlow } from './auth';
import { createCategoryFlow, getCategoriesFlow } from './categories';

export function* rootSaga() {
    // Authentication
    yield fork(autoAuthenticate);
    yield fork(loginFlow);

    // Categories
    yield fork(getCategoriesFlow);
    yield fork(createCategoryFlow);
}
