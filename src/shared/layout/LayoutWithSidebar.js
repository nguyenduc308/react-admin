import React from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const LayoutWithSidebar = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <div className="grid wide">
                <div className="row">
                    <div className="col col-3">
                        <Sidebar />
                    </div>
                    <div className="col col-9">{children}</div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default LayoutWithSidebar;
