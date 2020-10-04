import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutOutlined } from '@ant-design/icons';

import { LOGOUT } from '../../../store/constants/auth';
import './header.scss';

const Header = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };
    return (
        <header className="header">
            <div className="grid wide">
                <div className="header-content">
                    <div className="header-left">
                        <Link to="/" className="logo">
                            <img
                                className="logo-header-img"
                                src="/favicon.png"
                                alt="admin duclux"
                            />
                            <span>Admin</span>
                        </Link>
                    </div>
                    {isAuth && (
                        <div className="header-right">
                            <div className="logout" onClick={logout}>
                                <LogoutOutlined />
                                <span className="text">Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
