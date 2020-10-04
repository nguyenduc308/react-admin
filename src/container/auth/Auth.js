import React from 'react';
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom';

import * as PATH from '../../const/paths';
import Login from './login/Login';
import './auth.scss';
import { useUnAuth } from '../../shared/hooks/useUnAuth';

const Auth = () => {
    useUnAuth();
    const matchRoute = useRouteMatch();
    return (
        <React.Fragment>
            <div className="auth">
                <Redirect
                    from={matchRoute.url}
                    to={`${matchRoute.url}/${PATH.LOGIN}`}
                ></Redirect>
                <Switch>
                    <Route
                        path={`${matchRoute.url}/${PATH.LOGIN}`}
                        component={Login}
                    ></Route>
                    <Route
                        path={`${matchRoute.url}/${PATH.REGISTER}`}
                        component={Login}
                    ></Route>
                </Switch>
            </div>
        </React.Fragment>
    );
};

export default Auth;
