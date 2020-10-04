import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
export const useUnAuth = (pathRedirect = '/') => {
    const { isAuth, loading } = useSelector((state) => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (isAuth && !loading) {
            history.push(pathRedirect);
        }
    }, [isAuth, loading, history, pathRedirect]);
};
