import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div>
            <ul>
                <li>
                    <b>Categories</b>
                </li>
                <li>
                    <Link to="/categories/list">List Categories</Link>
                </li>
                <li>
                    <Link to="/categories/create">Create category</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
