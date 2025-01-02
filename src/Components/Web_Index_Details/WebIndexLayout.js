import React from 'react';
import { Outlet } from 'react-router-dom';
import { WebNavbar } from '../com_index';


const WebIndexLayout = () => {


    return (
        <div className='web-container'>

            <div className='web-header-navbar'>
                <WebNavbar />
            </div>

            {/* Content Area */}
            <div className="web-body-container">
                <Outlet /> {/* Renders the routed content */}
            </div>

            {/* <div className='Footer'>
                <Footer />
            </div> */}

        </div>
    );
};

export default WebIndexLayout;
