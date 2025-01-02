// src/ManageUsersLayout.js
import React, { useState, useEffect } from 'react';
import { ProjectComponents, ProjectVersions, Sidebar} from '../../../com_index';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../HomeIndexDetails/SideBarDetails/SidebarContent.scss'; // CSS for layout


const ProjectDetails = ({ projectId, selectedCom }) => {
    
    const [activeComponent, setActiveComponent] = useState(selectedCom || 'components'); 
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    // const parseQueryParams = () => {
    //     // const { projectId, selectedCom } = params();
    //     const searchParams = new URLSearchParams(location.search);
    //     const id = parseInt(searchParams.get('projectId'));
    //     return { id };
    // };

    // const { id } = parseQueryParams();

    console.log(projectId, selectedCom)

    useEffect(() => {
        if (projectId && selectedCom) {
            setActiveComponent(selectedCom);
        }
    }, [selectedCom, projectId]);


    // Function to render the active component based on the state
    const renderActiveComponent = (active) => {
        switch (active) {
            case 'components':
                return <ProjectComponents projectId={projectId} />;
            case 'versions':
                return <ProjectVersions projectId={projectId} />;
            default:
                return <ProjectComponents projectId={projectId}/>; // Default component
        }
    };

    return (
        <div className="sidebar-content-container">
            
            <Sidebar
                selectedOption= 'ProjectDetails'
                projectId={projectId}
                setActiveComponent={setActiveComponent} // Pass the function to change the active component
            />
            <div className="content-area">
                {/* Render the active component based on the current state */}
                {renderActiveComponent(activeComponent)}
            </div>
        </div>
    );
};

ProjectDetails.propTypes = {
    projectId: PropTypes.number.isRequired,
};

export default ProjectDetails;


