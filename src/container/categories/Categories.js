import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import * as paths from '../../const/paths';
import ListCategories from './ListCategories';
import CreateCategory from './CreateCategory';

const Categories = () => {
    const match = useRouteMatch();
    return (
        <React.Fragment>
            <Switch>
                <Route
                    path={`${match.url}/${paths.LIST}`}
                    component={ListCategories}
                />
                <Route
                    path={`${match.url}/${paths.CREATE}`}
                    component={CreateCategory}
                />
            </Switch>
        </React.Fragment>
    );
};
export default Categories;
