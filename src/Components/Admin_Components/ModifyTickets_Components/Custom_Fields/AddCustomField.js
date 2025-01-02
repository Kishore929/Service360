import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GetCustomFieldTypes_API } from '../../../api_index';
import FieldConfig from './FieldConfig';
import './CustomField.scss';



const AddCustomField = ({ onCancel, onSuccess, displayMessage }) => {


    const [fieldTypes, setFieldTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFieldConfig, setShowFieldConfig] = useState(false);
    const [error, setError] = useState('');
    const [selectedFieldType, setSelectedFieldType] = useState(null);


    // Map field types to icons
    // <img src={fieldIconSrcPath[field.typeName]} width="50" height="40" />
    const fieldIconSrcPath = {
        'Single Text': 'fas fa-edit',
        'Multi Line Text': 'fas fa-paragraph',
        'Single Select': 'far fa-circle',
        'Multi Select': 'far fa-square',
        'Cascading Select': 'fas fa-layer-group',
        'User picker': 'fas fa-user',
        'Date Picker': 'fas fa-calendar-alt',
        'Date Time Picker': 'fas fa-clock',
        'Labels': 'fas fa-tags',
        'URL field': 'fas fa-link',
        'Single Line Number Field': 'fas fa-hashtag',
        'DropDown': 'fas fa-chevron-down',
    };

    const handleCreate = () => {
        if (selectedFieldType) {
            setShowFieldConfig(true);
            console.log('created clicked', selectedFieldType);
        } else {
            setError('Please select a field type.');
        }
    };

    const handleFieldSelection = (field) => {
        setSelectedFieldType(field);
        setError('');
        console.log('select', field, field.typeName, field.isOptionsNeeded);
    };

    const loadCustomFieldTypes = async () => {
        setLoading(true);
        try {
            const data = await GetCustomFieldTypes_API();
            setFieldTypes(data.result || []);
        } finally {
            setLoading(false);
        }
    };

    const closeFieldConfig = () => {
        setShowFieldConfig(false); // Close modal
    }

    useEffect(() => {
        loadCustomFieldTypes();
    }, []);

    return (
        <div className="custom-fields-container">
            {loading && <div className="loading-indicator">Loading...</div>}
            {error && <div className="error-message">{error}</div>}

            {showFieldConfig ? (
                <FieldConfig 
                selectedfield={selectedFieldType} 
                onCancel={closeFieldConfig} 
                onSuccess={onSuccess}
                displayMessage={displayMessage}
                />
            ) : (
                <>
                    <div className='selectCustomField'>
                        <div className="header-row-selectFieldType">
                            <h4>Select a Field Type</h4>
                        </div>

                        <table className="custom-field-table">
                            <thead>
                                <tr>
                                    <th className="custom-field-th">Type Name</th>
                                    <th className="custom-field-th">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fieldTypes.length > 0 ? (
                                    fieldTypes.map((field) => (
                                        <tr key={field.id}
                                            className={`custom-field-row ${selectedFieldType === field ? 'selected-row' : ''}`}
                                            onClick={() => handleFieldSelection(field)}
                                        >
                                            {/* Render the icon for each field */}
                                            <td className="custom-field-td">
                                                {<i className={fieldIconSrcPath[field.typeName]} style={{ marginLeft: '10px' }}></i>}
                                                <span style={{ marginLeft: '15px' }}>{field.typeName}</span>
                                                
                                            </td>
                                            <td className="custom-field-td">{field.description}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="custom-field-td no-fields">No Fields types available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* Buttons for Create and Cancel */}
                        <div className="button-group">
                            <button className="create-CustomField-btn" onClick={handleCreate}>Create</button>
                            <button className="cancel-CustomField-btn" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </>
            )}
        </div >
    );
};

export default AddCustomField;