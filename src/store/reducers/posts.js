import {
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    GET_POSTS_SUCCESS,
    GET_POST_BY_SLUG_SUCCESS,
    CLEAR_CURRENT_POST,
} from '../constants/posts';

const initialState = {
    list: {},
    posting: false,
    currentPost: {},
};
export default (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                list: action.payload,
            };
        case CREATE_POST_REQUEST:
            return {
                ...state,
                posting: true,
            };
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: [...state.list.data, action.payload],
                },
                posting: false,
            };
        case GET_POST_BY_SLUG_SUCCESS:
            return {
                ...state,
                currentPost: action.payload,
            };
        case CLEAR_CURRENT_POST:
            return {
                ...state,
                currentPost: {},
            };
        default:
            return state;
    }
};
