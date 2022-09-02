import React from 'react';
import logo from '../../Images/logo/logo.png'
const Loading = () => {
    return (
        <div className="h-screen flex items-center justify-center ">
            <div className=" animate-ping">
                <img src={logo} alt="PerformCamp logo" />
            </div>
        </div>
    );
};

export default Loading;