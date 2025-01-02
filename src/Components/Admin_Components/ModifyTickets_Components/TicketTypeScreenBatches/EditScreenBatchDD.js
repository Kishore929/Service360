import React, { useState, useEffect } from 'react';
import { getScreenBatches_API, EditTicketTypeScreenBatchEntry_API } from '../../../api_index';

const EditScreenBatchDD = ({ isOpen, onClose, item, onUpdate }) => {
    const [screenBatchNames, setScreenBatchNames] = useState([]);
    const [selectedScreenBatch, setSelectedScreenBatch] = useState('');

    // Set initial values for the selected item (edit mode)
    useEffect(() => {
        if (item && item.screenBatch) {
            setSelectedScreenBatch(item.screenBatch.id || ''); // Set selected screen batch ID
        }
    }, [item]);

    // Fetch screen batch names when the modal opens
    useEffect(() => {
        if (isOpen) {
            fetchScreenBatchNames();
        }
    }, [isOpen]);

    const fetchScreenBatchNames = async () => {
        try {
            const response = await getScreenBatches_API();
            if (response.isSuccess) {
                setScreenBatchNames(response.result || []);
            }
        } catch (error) {
            console.error('Error fetching screen batch names:', error);
        }
    };

    const handleSave = async () => {
        if (!selectedScreenBatch) {
            alert('Please select a valid screen batch.');
            return;
        }

        const updatedData = {
            id: item.id, // Keep the existing ID
            screenBatchId: selectedScreenBatch, // Update only the screen batch ID
            ticketTypeId: item.ticketTypeId, // Pass ticket type ID
            ticketTypeScreenBatchId: item.ticketTypeScreenBatchId, // Pass ticket type screen batch ID
        };

        try {
            const response = await EditTicketTypeScreenBatchEntry_API(updatedData);

            if (response.isSuccess) {
                console.log('Screen batch updated successfully');
                onUpdate(updatedData); // Update the parent with new data
                onClose(); // Close the modal
            } else {
                console.error('Failed to update screen batch:', response.errorMessage);
            }
        } catch (error) {
            console.error('Error updating screen batch:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'is-open' : ''}`}>
            <div className="modal-content">
                <h5>Edit Screen Batch</h5>
                <div>
                    <label>Select Screen Batch:</label>
                    <select
                        value={selectedScreenBatch}
                        onChange={(e) => setSelectedScreenBatch(e.target.value)}
                    >
                        <option value="">Select a screen batch</option>
                        {screenBatchNames.map((batch) => (
                            <option key={batch.id} value={batch.id}>
                                {batch.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="modal-actions">
                    <button onClick={handleSave}>Update</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default EditScreenBatchDD;
