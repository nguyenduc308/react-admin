import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    return (
        <Route
            {...rest}
            render={(props) => {
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
