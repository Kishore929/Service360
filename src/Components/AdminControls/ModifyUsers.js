// src/ModifyUsersLayout.js
import React, { useState, useEffect } from 'react';
import { Sidebar, TicketTypes, TicketTypeBatches, CustomFields, Status, Priorities, Screens, ScreenBatches, TTScreenBatches, Resolution } from '../com_index';
import '../HomeIndexDetails/SideBarDetails/SidebarContent.scss'; // CSS for layout



const ModifyUsers = ({ selectedCom }) => {
    // State to track the active component
    const [activeComponent, setActiveComponent] = useState(selectedCom || 'ticketTypes'); // Default is 'ticketTypes'

    useEffect(() => {
        // Update active component when the URL changes
        if (selectedCom) {
            setActiveComponent(selectedCom);
        }
    }, [selectedCom]);

    const renderActiveComponent = (active) => {
        switch (active) {
            case 'ticketTypes':
                return <TicketTypes />;
            case 'ticketTypeBatches': 
            // Ensure this matches what you pass in the sidebar
                return <TicketTypeBatches />;
            case 'customFields':
                return <CustomFields />;
            case 'status':
                return <Status />;
            case 'resolution':
                return <Resolution />;
            case 'priorities':
                return <Priorities />;
            case 'screens':
                return <Screens />;
            case 'screenBatches':
                return <ScreenBatches />;
            case 'TTScreenBatches':
                return <TTScreenBatches />;
            default:
                return <TicketTypes />; // Default component
        }
    };

    return (
        <div className="sidebar-content-container">

            <Sidebar
                selectedOption= "ModifyUsers"
                setActiveComponent={setActiveComponent} // Pass the function to change the active component
            />

            <div className="content-area">
                {/* Render the active component based on the current state */}
                {renderActiveComponent(activeComponent)}
            </div>

        </div>

    );
};

export default ModifyUsers;
