import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
export const useUnAuth = (pathRedirect = '/') => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const history = useHistory();

    useEffect(() => {
        if (isAuth) {
            history.goBack(pathRedirect);
        }
    }, [pathRedirect, isAuth]);
};
