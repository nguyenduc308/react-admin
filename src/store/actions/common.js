import api from '../../shared/service/apis';

export const getItemAction = (endpoint, typeAction, params) => {
    return async (dispatch) => {
        try {
            const res = await api.get(endpoint, params);
            if (typeAction) {
                dispatch({
                    type: typeAction,
                    payload: res.data,
                });
            }
            return res.data;
        } catch (error) {
            return Promise.reject(error);
        }
    };
};
