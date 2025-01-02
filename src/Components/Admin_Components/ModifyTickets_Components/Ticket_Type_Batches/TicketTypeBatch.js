import React, { useEffect, useRef, useState } from 'react';
import { getTicketTypeBatches_API, DeleteTicketTypeBatch_API } from '../../../api_index';
import AddTicketTypeBatch from './AddTicketTypeBatch';
import EditTicketTypeBatch from './EditTicketTypeBatch';
import AssociateTicketTypeBatch from './AssociateTicketTypeBatch';
import { Notification } from '../../../com_index';
import './TicketTypeBatches.scss';

const TicketTypeBatches = () => {
    const [ticketTypeSchemes, setTicketTypeSchemes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAssociateForm, setShowAssociateForm] = useState(false);
    const [selectedTicketTypeScheme, setSelectedTicketTypeScheme] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const dropdownRef = useRef(null);

    const loadTicketTypeSchemes = async () => {
        setLoading(true);
        try {
            const data = await getTicketTypeBatches_API();
            setTicketTypeSchemes(data.result);
        } catch (error) {
            console.error('Error fetching ticket types:', error);
            showNotification('Error fetching ticket type schemes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTicketTypeSchemes();
    }, []);

    // Handle click outside the dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const showNotification = (message) => {
        setNotification(message);
    };

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const handleClose = () => {
        setShowAddForm(false);
        setShowUpdateForm(false);
        setShowAssociateForm(false);
        setSelectedTicketTypeScheme(null);
    };

    const handleAddSuccess = async () => {
        await loadTicketTypeSchemes();
        handleClose();
    };

    const handleUpdateSuccess = async () => {
        await loadTicketTypeSchemes();
        handleClose();
    };

    const handleAssociateSuccess = async () => {
        await loadTicketTypeSchemes();
        handleClose();
    };

    const handleEditClick = (scheme) => {
        setSelectedTicketTypeScheme(scheme);
        setShowUpdateForm(true);
        setOpenDropdownId(null);
    };

    const handleAssociateClick = (scheme) => {
        setSelectedTicketTypeScheme(scheme);
        setShowAssociateForm(true);
        setOpenDropdownId(null);
    };

    const handleDeleteClick = async (schemeId) => {
        if (window.confirm('Are you sure you want to delete this ticket type scheme?')) {
            try {
                const response = await DeleteTicketTypeBatch_API(schemeId);
                if (response.isSuccess) {
                    showNotification(response.message);
                    setTicketTypeSchemes(ticketTypeSchemes.filter(scheme => scheme.id !== schemeId));
                } else {
                    showNotification(response.errorMessage || 'Failed to delete the scheme.');
                }
            } catch (error) {
                console.error('Error deleting ticket type scheme:', error);
                showNotification('Error deleting ticket type scheme. Please try again.');
            }
        }
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="TT_Batches-container">
            {showAddForm ? (
                <AddTicketTypeBatch
                    onCancel={handleClose}
                    onSuccess={handleAddSuccess}
                    displayMessage={showNotification}
                />
            ) : showAssociateForm ? (
                <AssociateTicketTypeBatch
                    onCancel={handleClose}
                    onSuccess={handleAssociateSuccess}
                    scheme={selectedTicketTypeScheme}
                    displayMessage={showNotification}
                />
            ) : showUpdateForm ? (
                <EditTicketTypeBatch
                    ticketType={selectedTicketTypeScheme}
                    onClose={handleClose}
                    onSuccess={handleUpdateSuccess}
                    displayMessage={showNotification}
                />
            ) : (
                <>
                    <div className="TT_Batches-header-row-tickettypebatch">
                        <h4>Ticket Type Batches</h4>
                        <button onClick={handleAddClick} className="TT_Batches-add-tickettypebatch-btn">
                            Add Ticket Type Batch
                        </button>
                    </div>

                    {loading && <div className="loading-indicator">Loading...</div>}

                    {notification && <Notification message={notification} />}

                    <table className="TT_Batches-table">
                        <thead>
                                <th scope="col"><h6>Scheme Name</h6></th>
                                <th scope="col"><h6>Ticket Types</h6></th>
                                <th scope="col"><h6>Projects</h6></th>
                                <th scope="col"><h6>Actions</h6></th>
                        </thead>
                        <tbody>
                            {ticketTypeSchemes.length > 0 ? (
                                ticketTypeSchemes.map((scheme) => (
                                    <tr key={scheme.id} style={{ verticalAlign: 'top' }}>
                                        <td style={{ cursor: 'pointer', color: '#007bff', padding: '10px', verticalAlign: 'top' }}>
                                            {scheme.name}
                                            <div style={{ fontSize: 'small', color: '#555' }}>{scheme.description}</div>
                                        </td>
                                        <td>
                                            {scheme.ticketTypes.map(ticketType => (
                                                <div key={ticketType.id}>
                                                    <div style={{ fontSize: 'small', color: '#555' }}>{ticketType.name}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {scheme.projects.map(project => (
                                                <div key={project.id}>
                                                    <div style={{ fontSize: 'small', color: '#555' }}>{project.name}</div>
                                                </div>
                                            ))}
                                        </td>
                                        <td >
                                            <div className="TT_Batches-dropdown" >
                                                <div
                                                    align="center"
                                                    className={`TT_Batches-td-3dots ${openDropdownId === scheme.id ? 'highlight' : ''}`}
                                                    onClick={() => toggleDropdown(scheme.id)}
                                                >
                                                    <i className="fas fa-ellipsis-h"></i>

                                                </div>
                                                {openDropdownId === scheme.id && (
                                                    <div
                                                        ref={dropdownRef}
                                                        className="TT_Batches-dropdown-menu-simple"
                                                    >
                                                        <div className="TT_Batches-dropdown-item-batches" onClick={() => handleAssociateClick(scheme)}>
                                                            Associate
                                                        </div>
                                                        <div className="TT_Batches-dropdown-item-batches" onClick={() => handleEditClick(scheme)}>
                                                            Edit
                                                        </div>
                                                        <div className="TT_Batches-dropdown-item-batches" onClick={() => handleDeleteClick(scheme.id)}>
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
                                    <td colSpan="4">No ticket type schemes available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default TicketTypeBatches;
