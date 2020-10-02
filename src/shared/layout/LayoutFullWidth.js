import React from 'react';
import Header from './header/Header';

const LayoutFullWith = ({ children }) => {
    return (
        <React.Fragment>
            <Header />
            <hr />
            {children}
        </React.Fragment>
    );
};
export default LayoutFullWith;
