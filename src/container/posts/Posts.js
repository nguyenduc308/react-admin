import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import * as paths from '../../const/paths';
import ListPosts from './ListPosts';
import CreatePost from './CreatePost';
import EditPost from './EditPost';

const Posts = () => {
    const match = useRouteMatch();
    return (
        <React.Fragment>
            <Switch>
                {/* <Route
                    path={`${match.url}`}
                    component={ListPosts}
                /> */}
                <Route
                    path={`${match.url}/${paths.LIST}`}
                    component={ListPosts}
                />
                <Route
                    path={`${match.url}/${paths.CREATE}`}
                    component={CreatePost}
                />
                <Route path={`${match.url}/:slug`} component={EditPost} />
            </Switch>
        </React.Fragment>
    );
};
export default Posts;
