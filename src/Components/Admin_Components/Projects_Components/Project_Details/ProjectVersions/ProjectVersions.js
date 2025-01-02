import React, { useState, useEffect, useRef } from 'react';
import { GetVersionsByProject_API, GetUsers_API, AddVersion_API, UpdateVersion_API, DeleteVersion_API } from '../../../../api_index';
import { Notification } from '../../../../com_index';
import { useNavigate, useLocation } from 'react-router-dom';
import Select from 'react-select';
import './Versions.scss';

const ProjectVersions = ({ projectId }) => {

    const [versions, setVersions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [error, setError] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [updateVersion, setUpdateVersion] = useState(null)
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: '100%', bottom: 'auto' });
    const dropdownRef = useRef(null);
    const navigate = useNavigate();


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


    const fetchVersionDetails = async () => {
        try {
            const response = await GetVersionsByProject_API(projectId);
            if (response.isSuccess) {
                setVersions(response.result);
            } else {
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error fetching ticket types:', error);
        }
    };

    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const response = await GetUsers_API();
                const usersForProject = [...new Set(response.result.map(project => ({ value: project.id, label: project.userName })))];
                setUsers(usersForProject || []);
            } catch (error) {
                console.error('Failed to fetch fields', error);
            }
        };

        fetchUsers();
        fetchVersionDetails();
    }, [projectId]);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(''), 3000);
    };

    const AddVersionClick = () => {
        setIsEditMode(false);
        setDialogOpen(true);
    };

    const UpdateVersionClick = (version) => {
        setOpenDropdownId(null);
        setUpdateVersion(version);
        setIsEditMode(true); // Set to edit mode
        setDialogOpen(true);
        // Populate fields with the existing version data
        setName(version.name);
        setStartDate(version.startDate.split('T')[0]); // Extract the date part
        setEndDate(version.endDate.split('T')[0]); // Extract the date part

        const existUser = users.find(user => user.id === version.versionLead)
        console.log(existUser);
        const selectOption = {
            value: existUser?.id,
            label: existUser?.userName
        };
        setSelectedUser(selectOption);
    };

    const handleModalClose = () => {
        setDialogOpen(false);
        setIsEditMode(false);
        setName('');
        setStartDate('');
        setEndDate('');
        setSelectedUser([]);
    };


    const deleteVersion = async (version) => {
        if (window.confirm(`Are you sure you want to delete ${version.name}?`)) {
            setOpenDropdownId(null);
            console.log(version.id);
            try {
                const response = await DeleteVersion_API(version.id);
                if (response.isSuccess) {
                    setVersions(response.result);
                    showNotification(response.message);
                } else {
                    console.error(`Failed to delete version: ${response.errorMessage}`);
                }
            } catch (error) {
                console.error('Error deleting version:', error);
            }
        };
    }


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Format the startDate and endDate as required
        const formattedStartDate = startDate ? new Date(startDate).toISOString() : '';
        const formattedEndDate = endDate ? new Date(endDate).toISOString() : '';

        if (isEditMode && updateVersion) {

            try {
                const updatedVersion = {
                    id: updateVersion.id,
                    name,
                    projectId,
                    versionLead: selectedUser?.value || null, // Ensure versionLead is a valid ID or null
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    isReleased: false
                };

                const response = await UpdateVersion_API(updatedVersion);
                console.log('API response:', response.result);

                if (response.isSuccess === 1) {
                    setDialogOpen(false);
                    showNotification(response.message);
                    console.log('Success message:', response.message);
                    setVersions(response.result);
                } else {
                    showNotification(response.errorMessage);
                    console.log('Error message:', response.errorMessage);
                }
            } catch (error) {
                console.error('Error updating version:', error);
            } finally {
                setLoading(false);
            }

        } else {

            try {
                const newVersion = {
                    name,
                    projectId,
                    versionLead: selectedUser?.value || null, // Ensure versionLead is a valid ID or null
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                };

                const response = await AddVersion_API(newVersion);
                console.log('API response:', response.result);

                if (response.isSuccess === 1) {
                    setDialogOpen(false);
                    showNotification(response.message);
                    console.log('Success message:', response.message);
                    setVersions(response.result);
                } else {
                    showNotification(response.errorMessage);
                    console.log('Error message:', response.errorMessage);
                }
            } catch (error) {
                console.error('Error adding version:', error);
            } finally {
                setLoading(false);
            }

        }

        setName('');
        setStartDate('');
        setEndDate('');
        setSelectedUser([]);
    };


    return (
        <div className="versions-container">
            <div className="header-row-versions">
                <h4>Versions</h4>
                <button className="versions-btn" onClick={AddVersionClick}>
                    Add Version
                </button>
            </div>

            {loading && <div className="loading-indicator">Loading...</div>}
            {notification && <Notification message={notification} />}


            <table className="versions-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Version</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {versions?.length > 0 ? (
                        versions.map((version) => (
                            <tr key={version}>
                                <td>
                                    <a
                                        href={`#`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'blue',
                                        }}
                                    >
                                        {version.name}
                                    </a>
                                </td>
                                <td>
                                    {version.isReleased ? (
                                        'Released'
                                    ) : (
                                        <span style={{ fontWeight: 'bold', color: 'blue' }}>
                                            UNRELEASED
                                        </span>
                                    )}
                                </td>
                                <td>{version.startDate}</td>
                                <td>{version.endDate}</td>
                                <td>
                                    <div className="dropdown" ref={dropdownRef}>
                                        <div
                                            align="left"
                                            className="td-3dots"
                                            onClick={() => toggleDropdown(version.id)}
                                        >
                                            <i className="fas fa-ellipsis-h"></i>
                                        </div>
                                        {openDropdownId === version.id && (
                                            <div
                                                ref={dropdownRef}
                                                className="dropdown-menu-versions edge-right"
                                                style={{ ...dropdownPosition }}
                                            >

                                                <div className="dropdown-item-versions"
                                                // onClick={() => handleArchiveClick(field)}
                                                >
                                                    Archive</div>
                                                <div
                                                    className="dropdown-item-versions"
                                                    onClick={() => UpdateVersionClick(version)}
                                                >
                                                    Update
                                                </div>
                                                <div className="dropdown-item-versions"
                                                    onClick={() => deleteVersion(version)}
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
                            <td colSpan="4">No Versions available</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {dialogOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>{isEditMode ? 'Update Version' : 'Add New Version'}</h4>

                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group" style={{ marginTop: '15px' }}>
                                <b><label>Name:</label></b>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label><h6>Select Lead:</h6></label>
                                <Select
                                    options={users}
                                    onChange={setSelectedUser}
                                    placeholder="Select user..."
                                    isClearable
                                />
                            </div>

                            <div className="form-group">
                                <b><label>Start Date:</label></b>
                                <input
                                    type="date"
                                    name="startDate"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <b><label>End Date:</label></b>
                                <input
                                    type="date"
                                    name="endDate"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="button-group">
                                <button type="submit" className="versions-btn">{isEditMode ? 'Update' : 'Add'}</button>
                                <button type="button" className="versions-btn" onClick={handleModalClose}>
                                    Cancel
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProjectVersions;
