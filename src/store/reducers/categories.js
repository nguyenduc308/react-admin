import {
    CREATE_CATEGORY_SUCCESS,
    GET_CATEGORIES_SUCCESS,
} from '../constants/categories';

const initialState = {
    list: {},
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [...state.list.data, action.payload],
                },
            };
        default:
            return state;
    }
};
