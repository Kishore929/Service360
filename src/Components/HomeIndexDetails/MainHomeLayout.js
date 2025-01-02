import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CustomNavbar } from '../com_index';
import './MainHomeLayout.scss';


const MainHomeLayout = () => {

    const navigate = useNavigate();


    const handleSelectOption = (action) => {
        console.log(action)
        navigate(`${action}`);
    };

    return (
        <div className='home-container'>

            <div className='home-header-navbar'>
                <CustomNavbar selectOption={handleSelectOption} />
            </div>

            {/* Content Area */}
            <div className="home-body-container">
                <Outlet /> {/* Renders the routed content */}
            </div>

            {/* <div className='Footer'>
                <Footer />
            </div> */}

        </div>
    );
};

export default MainHomeLayout;
