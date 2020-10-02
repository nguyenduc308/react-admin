import { combineReducers } from 'redux';
import authReducer from './auth';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
});

export default rootReducer;
