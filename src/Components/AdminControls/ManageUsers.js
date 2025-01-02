// src/ManageUsersLayout.js
import React, { useState, useEffect } from 'react';
import { Sidebar, Tab1, Tab2, Tab3 } from '../com_index';
import '../HomeIndexDetails/SideBarDetails/SidebarContent.scss'; // CSS for layout


const ManageUsersLayout = ({ selectedCom }) => {
    // State to track the active component
    const [activeComponent, setActiveComponent] = useState(selectedCom || 'tab1'); // Default is 'tab1'

    useEffect(() => {
        // Update active component when the URL changes
        if (selectedCom) {
            setActiveComponent(selectedCom);
        }
    }, [selectedCom]);

    // Function to render the active component based on the state
    const renderActiveComponent = (active) => {
        switch (active) {
            case 'tab1':
                return <Tab1 />;
            case 'tab2':
                return <Tab2 />;
            default:
                return <Tab1 />; // Default component
        }
    };

    return (
        <div className="sidebar-content-container">
            {/* Sidebar with selected option 'Manage Users' */}
            <Sidebar 
                selectedOption='ManageUsers'
                setActiveComponent={setActiveComponent} // Pass the function to change the active component
            />
            <div className="content-area">
                {/* Render the active component based on the current state */}
                {renderActiveComponent(activeComponent)}
            </div>
        </div>
    );
};

export default ManageUsersLayout;
