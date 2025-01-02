// src/ManageUsersLayout.js
import React, { useState, useEffect } from 'react';
import { Sidebar, ManageProjects, ProjectCategories} from '../com_index';
import '../HomeIndexDetails/SideBarDetails/SidebarContent.scss'; // CSS for layout


const Projects = ({ selectedCom }) => {
    // State to track the active component
    const [activeComponent, setActiveComponent] = useState(selectedCom || 'manageProjects'); // Default is 'tab1'
    const [selectedOption, setSelectedOption] = useState('Projects');

    useEffect(() => {
        // Update active component when the URL changes
        if (selectedCom) {
            setActiveComponent(selectedCom);
        }
    }, [selectedCom]);

    // Function to render the active component based on the state
    const renderActiveComponent = (active) => {
        switch (active) {
            case 'manageProjects':
                return <ManageProjects />;
            case 'projectCategories':
                return <ProjectCategories />;
            default:
                return <ManageProjects />; // Default component
        }
    };

    return (
        <div className="sidebar-content-container">
            {/* Sidebar with selected option 'Manage Users' */}
            <Sidebar
                selectedOption= 'Projects'
                setActiveComponent={setActiveComponent} // Pass the function to change the active component
            />
            <div className="content-area">
                {/* Render the active component based on the current state */}
                {renderActiveComponent(activeComponent)}
            </div>
        </div>
    );
};

export default Projects;
