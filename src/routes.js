import * as paths from './const/paths';
import { Categories, ListCategories } from './container/categories';
import { Home } from './container/home';

export const routes = [
    {
        id: '1x2',
        path: paths.HOME,
        component: Home,
        isPrivate: true,
        exact: true,
    },
    {
        id: '2x2',
        path: `/${paths.CATEGORIES}`,
        component: Categories,
        isPrivate: true,
        exact: false,
    },
];
