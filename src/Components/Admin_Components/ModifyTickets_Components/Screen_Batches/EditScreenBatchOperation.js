import React, { useState, useEffect } from 'react';

const EditScreenBatchOperation = ({ operation, availableScreens, currentScreenId, onCancel, onUpdate }) => {
    const [selectedScreenId, setSelectedScreenId] = useState(currentScreenId || null);

    useEffect(() => {
        setSelectedScreenId(currentScreenId);
    }, [currentScreenId]);

    const handleScreenChange = (e) => {
        setSelectedScreenId(e.target.value);
    };

    const handleSubmit = () => {
        onUpdate(selectedScreenId);
    };

    return (
        <div className="EditScreenBatch-container">
            <h5>Edit {operation} Ticket Operation</h5>
            <label>Select Screen:</label>
            <select value={selectedScreenId} onChange={handleScreenChange}>
                <option value="">Select a Screen</option>
                {availableScreens.map((screen) => (
                    <option key={screen.id} value={screen.id}>
                        {screen.name}
                    </option>
                ))}
            </select>
            <div className="actions">
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    );
};

export default EditScreenBatchOperation;
