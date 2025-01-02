import React, { useEffect, useState, useRef } from 'react';
import { getTicketTypeScreenBatches_API, deleteTTScreenBatch_API } from '../../../api_index';
import AddTTScreenBatch from './AddTTScreenBatch';
import AssociateTTScreenBatch from './AssociateTTScreenBatch';
import EditTTScreenBatch from './EditTTScreenBatch';
import ConfigureTTScreenBatch from './ConfigureTTScreenBatch';
import { Notification } from '../../../com_index';
import "./TTScreenBatches.scss";

const TTScreenBatches = () => {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showAssociateForm, setShowAssociateForm] = useState(false);
    const [showConfigureForm, setShowConfigureForm] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [ticketTypeScreenBatchId, setTicketTypeScreenBatchId] = useState(null); // Add state for ticketTypeScreenBatchId
    const dropdownRef = useRef(null);

    const loadBatches = async () => {
        setLoading(true);
        try {
            const data = await getTicketTypeScreenBatches_API();
            setBatches(data.result || []);
        } catch (error) {
            console.error('Error fetching ticket batches:', error);
            showNotification('Error fetching screen batches. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBatches();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdownId(null);
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
        setShowConfigureForm(false);
        setSelectedBatch(null);
        setTicketTypeScreenBatchId(null); // Reset the ID state
    };

    const handleAddSuccess = async () => {
        await loadBatches();
        handleClose();
    };

    const handleUpdateSuccess = async () => {
        await loadBatches();
        handleClose();
    };

    const handleAssociateSuccess = async () => {
        await loadBatches();
        handleClose();
    };

    const handleConfigureSuccess = async () => {
        await loadBatches();
        handleClose();
    };

    const handleEditClick = (batch) => {
        setSelectedBatch(batch);
        setShowUpdateForm(true);
        setOpenDropdownId(null);
    };

    const handleAssociateClick = (batch) => {
        setSelectedBatch(batch);
        setShowAssociateForm(true);
        setOpenDropdownId(null);
    };

    const handleConfigureClick = (batch) => {
        setSelectedBatch(batch);
        setTicketTypeScreenBatchId(batch.id); // Set ticketTypeScreenBatchId
        setShowConfigureForm(true);
        setOpenDropdownId(null);
    };

    const handleDeleteClick = async (batchId) => {
        if (window.confirm('Are you sure you want to delete this batch?')) {
            try {
                const response = await deleteTTScreenBatch_API(batchId);
                if (response.isSuccess) {
                    showNotification('Batch deleted successfully');
                    await loadBatches();
                } else {
                    showNotification(response.errorMessage || 'Failed to delete the batch');
                }
            } catch (error) {
                console.error('Error deleting batch:', error);
                showNotification('Error deleting batch. Please try again.');
            }
        }
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId((prevId) => (prevId === id ? null : id));
    };

    return (
        <div className="TTScreenBatches-container">
            {showAddForm ? (
                <AddTTScreenBatch
                    onCancel={handleClose}
                    onSuccess={handleAddSuccess}
                    displayMessage={showNotification}
                />
            ) : showAssociateForm ? (
                <AssociateTTScreenBatch
                    onCancel={handleClose}
                    onSuccess={handleAssociateSuccess}
                    batch={selectedBatch}
                    displayMessage={showNotification}
                />
            ) : showUpdateForm ? (
                <EditTTScreenBatch
                    batch={selectedBatch}
                    onClose={handleClose}
                    onSuccess={handleUpdateSuccess}
                    displayMessage={showNotification}
                />
            ) : showConfigureForm ? (
                <ConfigureTTScreenBatch
                    batch={selectedBatch}
                    ticketTypeScreenBatchId={ticketTypeScreenBatchId} // Pass the ID to ConfigureTTScreenBatch
                    onClose={handleClose}
                    onSuccess={handleConfigureSuccess}
                />
            ) : (
                <>
                    <div className="TTScreenBatches-header-row">
                        <h4>Ticket Type Screen Batches</h4>
                        <button onClick={handleAddClick} className="TTScreenBatches-add-button">
                            Add Ticket Type Screen Batch
                        </button>
                    </div>

                    {loading && <div className="loading-indicator">Loading...</div>}
                    {notification && <Notification message={notification} />}

                    <table className="TTScreenBatches-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Projects</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {batches.length > 0 ? (
                                batches.map((batch) => (
                                    <tr key={batch.id}>
                                        <td
                                            style={{ cursor: 'pointer', color: '#007bff' }}
                                            onClick={() => handleConfigureClick(batch)}
                                        >
                                            {batch.name}
                                        </td>
                                        <td>{batch.description}</td>
                                        <td style={{ fontSize: 'small', color: '#555' }}>
                                            {batch.projects && batch.projects.length > 0
                                                ? batch.projects.map((project) => project.name).join(', ')
                                                : 'No associated projects'}
                                        </td>
                                        <td>
                                            <div className="TTScreenBatches-dropdown">
                                                <div
                                                    className={`TTScreenBatches-td-3dots ${openDropdownId === batch.id ? 'highlight' : ''}`}
                                                    onClick={() => toggleDropdown(batch.id)}
                                                >
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </div>
                                                {openDropdownId === batch.id && (
                                                    <div ref={dropdownRef} className="TTScreenBatches-dropdown-menu-simple">
                                                        <div className="TTScreenBatches-dropdown-item-batches" onClick={() => handleAssociateClick(batch)}>
                                                            Associate
                                                        </div>
                                                        <div className="TTScreenBatches-dropdown-item-batches" onClick={() => handleEditClick(batch)}>
                                                            Edit
                                                        </div>
                                                        <div className="TTScreenBatches-dropdown-item-batches" onClick={() => handleDeleteClick(batch.id)}>
                                                            Delete
                                                        </div>
                                                        <div className="TTScreenBatches-dropdown-item-batches" onClick={() => handleConfigureClick(batch)}>
                                                            Configure
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No batches available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default TTScreenBatches;
