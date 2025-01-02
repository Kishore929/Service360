import React, { useEffect, useState, useRef } from 'react';
import { GetProjects_API, DeleteProject_API } from '../../../api_index';
import { Notification } from '../../../com_index';
import { Link } from 'react-router-dom';
import CreateProject from './CreateProject';
import UpdateProject from './UpdateProject';
import './Projects.scss';

const ManageProjects = () => {

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState('');
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [showUpdateProject, setShowUpdateProject] = useState(false);
    const [selectProject, setSelectProject] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: '100%', bottom: 'auto' });
    const dropdownRef = useRef(null);


    // useEffect to handle click outside dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null); // Close dropdown if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = (id) => {

        setOpenDropdownId((prevId) => (prevId === id ? null : id));

        // Use setTimeout to wait for dropdown to render
        setTimeout(() => {
            if (dropdownRef.current) {
                const dropdownRect = dropdownRef.current.getBoundingClientRect();
                const spaceBelow = window.innerHeight - dropdownRect.bottom;
                const dropdownHeight = dropdownRect.height;

                // Check if there's enough space below, otherwise place above
                if (spaceBelow < dropdownHeight) {
                    // Not enough space below, position above
                    setDropdownPosition({ top: 'auto', bottom: '100%' });
                } else {
                    // Enough space below, position normally
                    setDropdownPosition({ top: '100%', bottom: 'auto' });
                }
            }
        }, 0);
    };

    const loadProjects = async () => {
        setLoading(true);
        try {
            const data = await GetProjects_API();
            setProjects(data.result || []);
        } catch (err) {
            setError(err.message);
            showNotification('Error fetching projects. Please try again.');
        } finally {
            setLoading(false);
            const timer = setTimeout(() => {
                setNotification('');
            }, 3000);

            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const createProjectDialog = () => {
        setShowCreateProject(true); // Open modal
    };

    const handleCreateSuccess = () => {
        loadProjects();
        setShowCreateProject(false); // Open modal
        setShowUpdateProject(false);
    };

    const handleCancelBtn = () => {
        setShowCreateProject(false); // Open modal
        setShowUpdateProject(false);
    };

    const updateProjectDialog = (project) => {
        setSelectProject(project);
        setShowUpdateProject(true); // Open modal
        setOpenDropdownId(null);
    };

    const deleteProject = async (project) => {
        setOpenDropdownId(null);
        if (window.confirm(`Are you sure you want to delete ${project.name}?`)) {
            try {
                const response = await DeleteProject_API(project.id);
                if (response.isSuccess) {
                    setProjects(response.result || []);
                    showNotification(response.message);
                } else {
                    console.error(`Failed to delete project: ${response.errorMessage}`);
                }
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        const timer = setTimeout(() => {
            setNotification('');
        }, 3000);
        return () => clearTimeout(timer);
    };

    return (
        <div className="container">

            {notification && (<Notification message={notification} />)}
            {error && <div className="error-message">{error}</div>}

            {showCreateProject ? (
                <CreateProject onSuccess={handleCreateSuccess} onCancel={handleCancelBtn} displayMessage={showNotification} />
            ) : showUpdateProject ? (
                <UpdateProject project={selectProject} onSuccess={handleCreateSuccess} onCancel={handleCancelBtn} displayMessage={showNotification} />
            ) : (
                <>
                    <div className="header-row-projects">
                        <h4>Manage Projects</h4>
                        <button className="projects-btn" onClick={createProjectDialog}>Create Project</button>
                    </div>

                    {loading && <div className="loading-indicator">Loading...</div>}

                    <table className="projects-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Key</th>
                                <th>Lead</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.length > 0 ? (

                                projects.map((project) => (
                                    <tr key={project}>
                                        <td>
                                            {project && (
                                                <div key={project.id}>
                                                    <Link
                                                        to={`ProjectDetails/components/${project.id}`} // Navigation path
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'blue',
                                                        }}
                                                    >
                                                        {project.name}
                                                    </Link>
                                                </div>
                                            )}
                                        </td>
                                        <td>{project.description}</td>
                                        <td>{project.projectKey}</td>
                                        <td>
                                            {project.projectLead && (
                                                <div key={project.projectLead.id}>
                                                    <a
                                                        href={`mailto:${project.projectLead.emailAddress}`} // Makes it clickable to open email client
                                                        title={project.projectLead.emailAddress}           // Tooltip to show email on hover
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: 'blue',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        {project.projectLead.userName}
                                                    </a>
                                                </div>
                                            )}
                                        </td>

                                        <td>
                                            <div className="dropdown" ref={dropdownRef}>
                                                <div
                                                    align="left"
                                                    className="td-3dots"
                                                    onClick={() => toggleDropdown(project.id)}
                                                >
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </div>
                                                {openDropdownId === project.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="dropdown-menu-projects edge-right"
                                                        style={{ ...dropdownPosition }}
                                                    >

                                                        <div className="dropdown-item-projects"
                                                        // onClick={() => handleArchiveClick(field)}
                                                        >
                                                            Archive</div>
                                                        <div
                                                            className="dropdown-item-projects"
                                                            onClick={() => updateProjectDialog(project)}
                                                        >
                                                            Update
                                                        </div>
                                                        <div className="dropdown-item-projects"
                                                            onClick={() => deleteProject(project)}
                                                        >
                                                            Delete
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No Projects available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}

        </div>

    );
};

export default ManageProjects;
