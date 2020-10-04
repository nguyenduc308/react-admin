import {
    // CREATE_CATEGORY_SUCCESS,
    GET_CATEGORIES_SUCCESS,
    DELETE_ITEM,
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
        // case CREATE_CATEGORY_SUCCESS:
        //     return {
        //         ...state,
        //         list: {
        //             ...state.list,
        //             data: [...state.list.data, action.payload],
        //         },
        //     };
        case DELETE_ITEM:
            return {
                ...state,
                list: {
                    ...state.list,
                    data: state.list.data.filter(
                        (item) => item._id !== action.payload,
                    ),
                },
            };
        default:
            return state;
    }
};
