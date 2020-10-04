import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useHistory } from 'react-router-dom';
import { LOCAL_TOKEN } from './const/keys';
import * as paths from './const/paths';
import { Auth } from './container/auth';
import LayoutFullWith from './shared/layout/LayoutFullWidth';
import { AUTO_LOGIN } from './store/constants/auth';
import { routes } from './routes';
import PrivateRoute from './HOC/PrivateRoute';
import LayoutWithSidebar from './shared/layout/LayoutWithSidebar';

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuth, loading: authenticating } = useSelector(
        (state) => state.auth,
    );

    useEffect(() => {
        const token = localStorage.getItem(LOCAL_TOKEN);
        if (token) {
            dispatch({
                type: AUTO_LOGIN,
                payload: token,
            });
        } else {
            history.push(`/${paths.AUTH}/${paths.LOGIN}`);
        }
    }, [history, dispatch]);
    useEffect(() => {
        if (!isAuth && !authenticating) {
            history.push(`/${paths.AUTH}/${paths.LOGIN}`);
        }
    }, [isAuth, authenticating, history]);

    return (
        <div className="container">
            <Switch>
                <Route
                    path="/auth"
                    render={(props) => {
                        return (
                            <LayoutFullWith>
                                <Auth {...props}></Auth>{' '}
                            </LayoutFullWith>
                        );
                    }}
                />

                <LayoutWithSidebar>
                    {routes.map((route) => {
                        if (route.isPrivate) {
                            return (
                                <PrivateRoute
                                    key={route.id}
                                    exact={route.exact}
                                    path={route.path}
                                    component={route.component}
                                />
                            );
                        } else {
                            return (
                                <Route
                                    exact={route.exact}
                                    key={route.id}
                                    path={route.path}
                                    component={route.component}
                                />
                            );
                        }
                    })}
                </LayoutWithSidebar>
            </Switch>
        </div>
    );
};

export default App;
