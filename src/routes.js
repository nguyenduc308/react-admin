import * as paths from './const/paths';
import { Home } from './container/home';
import { Categories } from './container/categories';
import { Posts } from './container/posts';
import { uuid } from './shared/helper';

export const routes = [
    {
        id: uuid(),
        path: `/${paths.CATEGORIES}`,
        component: Categories,
        isPrivate: true,
        exact: false,
    },
    {
        id: uuid(),
        path: `/${paths.POSTS}`,
        component: Posts,
        isPrivate: true,
        exact: false,
    },
    {
        id: uuid(),
        path: paths.HOME,
        component: Home,
        isPrivate: true,
        exact: true,
    },
];
