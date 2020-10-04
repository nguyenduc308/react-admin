import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LoadingSpinner } from '../shared/components/spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { isAuth, loading } = useSelector((state) => state.auth);
    return (
        <Route
            {...rest}
            render={(props) => {
                if (loading) {
                    return <LoadingSpinner />;
                }

                if (isAuth) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to="/auth" />;
                }
            }}
        />
    );
};

export default PrivateRoute;
