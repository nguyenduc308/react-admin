import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as paths from '../../../const/paths';

import './header.scss';

const Header = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <header className="header">
            <h1>Admin Dashboard</h1>
            {!isAuth && <Link to={`${paths.AUTH}/${paths.LOGIN}`}></Link>}
        </header>
    );
};

export default Header;
