import React, { useEffect, useState } from 'react';
import { UpdateCustomField_API } from '../../../api_index';


const UpdateCustomField = ({ customField, onCancel, onSuccess, displayMessage }) => {


    const [name, setName] = useState(customField ? customField.name : '');
    const [description, setDescription] = useState(customField ? customField.description : '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (customField) {
            setName(customField.name);
            setDescription(customField.description);
        }

    }, [customField]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedCustomField = {
            id: customField.customFieldId,
            name,
            description,
        };

        console.log('Data being sent to API:', updatedCustomField);

        try {
            const response = await UpdateCustomField_API(updatedCustomField);
            console.log('API response:', response);

            if (response.isSuccess === 1) {
                onSuccess(); // Call the onSuccess callback to refresh data
                displayMessage(response.message);
                console.log('Success message:', response.message);
            } else {
                displayMessage(response.errorMessage);
                console.log('Error message:', response.errorMessage);
            }
        } catch (error) {
            console.error('Error updating Custom Field:', error);
            displayMessage('Failed to Update Custom field. Please try again.');
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
        
    };

    return (
        <div>
            <div className="header-row-selectFieldType">
                <h3>Update '{customField.name}' Field</h3>
            </div>
            <form onSubmit={handleSubmit} className="field-config">

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Field Name:</label></b>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Description:</label></b>
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="button-group">
                    <button type="submit" className="create-field-button" disabled={loading}>
                        {loading ? 'Updateing...' : 'Update'}
                    </button>

                    <button type="button" className="cancel-field-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

UpdateCustomField.defaultProps = {
    onCancel: () => { }, // Default to a no-op function
    onSuccess: () => { }, // Default to a no-op function
};

export default UpdateCustomField;