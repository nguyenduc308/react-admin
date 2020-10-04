import { combineReducers } from 'redux';
import authReducer from './auth';
import categoriesReducer from './categories';
import postsReducer from './posts';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    posts: postsReducer,
});

export default rootReducer;
