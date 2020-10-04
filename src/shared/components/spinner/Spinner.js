import React from 'react';
import './spinner.scss';

const Loading = () => {
    return (
        <div className="spinner-wrapper">
            <div className="spinner-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;
