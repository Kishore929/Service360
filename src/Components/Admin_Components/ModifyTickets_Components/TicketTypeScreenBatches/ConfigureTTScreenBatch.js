import React, { useState, useEffect } from 'react';
import { configureTTScreenBatch_API, deleteTicketTypeScreenBatchEntry_API } from '../../../api_index'; 
import ModalPopup from './ModalPopup'; 
import EditScreenBatchDD from './EditScreenBatchDD'; // The modal for editing
import './TTScreenBatches.scss';

const ConfigureTTScreenBatch = ({ onClose, ticketTypeScreenBatchId }) => {
    const [batchData, setBatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const fetchBatchData = async () => {
        try {
            setLoading(true);
            const data = await configureTTScreenBatch_API(ticketTypeScreenBatchId);
            if (data.isSuccess) {
                setBatchData(data.result || []);
            } else {
                setErrorMessage(data.errorMessage || 'Failed to load batch data.');
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred while fetching batch data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (ticketTypeScreenBatchId) {
            fetchBatchData();
        }
    }, [ticketTypeScreenBatchId]);

    const handleEditClick = (item) => {
        console.log("Edit button clicked", item);
        setSelectedItem(item); // Set the item to be edited
        setIsEditModalOpen(true); // Open the edit modal
    };

    const handleDeleteClick = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
        if (confirmDelete) {
            try {
                const response = await deleteTicketTypeScreenBatchEntry_API(id);
                if (response.isSuccess) {
                    fetchBatchData(); // Re-fetch after deletion
                } else {
                    alert('Failed to delete entry.');
                }
            } catch (error) {
                console.error('Error deleting the entry:', error);
            }
        }
    };

    const handleAddButtonClick = () => {
        setSelectedItem(null);
        setIsModalOpen(true); // Open Add modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false); // Close Add modal
    };

    const handleEditModalClose = () => {
        setIsEditModalOpen(false); // Close Edit modal
    };

    const handleDataAdded = () => {
        fetchBatchData();
        setIsModalOpen(false); // Close Add modal
    };

    const handleDataUpdated = () => {
        fetchBatchData();
        setIsEditModalOpen(false); // Close Edit modal
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>;
    }

    if (errorMessage) {
        return <div className="error-message">{errorMessage}</div>;
    }

    return (
        <div className="ConfigureTTScreenBatch-container">
            <div className="TTScreenBatches-header-row">
                <h4>Configure Ticket-Type Screen Batches</h4>
                <button
                    className="TTScreenBatches-add-button"
                    onClick={handleAddButtonClick}
                >
                    Associate TicketType with Screen Batch
                </button>
            </div>

            {/* Modal for Adding Data */}
            <ModalPopup
                isOpen={isModalOpen}
                onClose={handleModalClose}
                ticketTypeScreenBatchId={ticketTypeScreenBatchId}
                selectedItem={selectedItem}
                onDataAdded={handleDataAdded}
            />

            {/* Conditional Rendering: Render Edit Modal when `isEditModalOpen` is true */}
            {isEditModalOpen && selectedItem && (
                <EditScreenBatchDD
                    isOpen={isEditModalOpen}
                    onClose={handleEditModalClose}
                    item={selectedItem} // Pass the selected item to edit
                    onUpdate={handleDataUpdated} // Handle update action after editing
                />
            )}

            {/* Table to Show Batch Data */}
            <table className="TTScreenBatches-table">
                <thead>
                    <tr>
                        <th>Ticket Type</th>
                        <th>Screen Batch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {batchData.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="no-data-cell">No data available for this screen batch.</td>
                        </tr>
                    ) : (
                        batchData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.ticketType?.name || 'N/A'}</td>
                                <td>{item.screenBatch?.name || 'N/A'}</td>
                                <td>
                                    <span 
                                        className="Ticket_Type-action-link"
                                        onClick={() => handleEditClick(item)} // Trigger edit
                                    >
                                        Edit
                                    </span>
                                    <span 
                                        className="Ticket_Type-action-link" 
                                        style={{ marginLeft: '10px' }}
                                        onClick={() => handleDeleteClick(item.id)}
                                    >
                                        Delete
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <div className="ConfigureTTScreenBatch-actions">
                <button onClick={onClose} type="button" className="cancel TTScreenBatches-cancel-button">
                    Close
                </button>
            </div>
        </div>
    );
};

export default ConfigureTTScreenBatch;
