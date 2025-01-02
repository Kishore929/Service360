// src/ManageUsersLayout.js
import React, { useState, useEffect } from 'react';
import { GetComponentsByProject_API } from '../../../../api_index';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Components.scss';

const ProjectComponents = ({ projectId }) => {

    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {

        const fetchComponentDetails = async () => {
            try {
                const response = await GetComponentsByProject_API(projectId);
                if (response.isSuccess) {
                    setComponents(response.result);
                    // closePage();
                    // displayMessage(response.message);
                } else {
                    console.error(response.message);
                }
            } catch (error) {
                console.error('Error fetching ticket types:', error);
            }
        };

        fetchComponentDetails();
    }, [projectId]);

    return (
        <div className="components-container">
            <>
                <div className="header-row-components">
                    <h4>Components</h4>

                    <button className="components-btn">Add component</button>

                </div>

                {loading && <div className="loading-indicator">Loading...</div>}

                <table className="components-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <th><h6>Name</h6></th>
                        <th><h6>User</h6></th>
                    </thead>
                    <tbody>
                        {components.length > 0 ? (
                            components.map((comp) => (
                                <tr key={comp.id}>
                                    <td>{comp.name}</td>
                                    <td>{comp.user.userName}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No Components available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        </div>
    );
};


ProjectComponents.propTypes = {
    projectId: PropTypes.number.isRequired,
};

export default ProjectComponents;
