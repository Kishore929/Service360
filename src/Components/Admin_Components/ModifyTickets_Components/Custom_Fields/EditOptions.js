import React, { useState } from 'react';
import './CustomField.scss';
import PropTypes from 'prop-types';
import { CreateAddOptionInContext_API, UpdateOptionInContext_API, EnableOrDisableOptionInContext_API, DeleteOptionInContext_API } from '../../../api_index';

const EditOptions = ({ context, closePage, displayMessage }) => {

    const [optionInput, setOptionInput] = useState('');
    const [optionsList, setOptionsList] = useState(context.contextValue);
    const [editingId, setEditingId] = useState(null); // Tracks the ID of the option being edited
    const [editValue, setEditValue] = useState('');   // Tracks the new value for the option being edited
    const [loading, setLoading] = useState(false);


    const EditContextOption = (option) => {
        setEditingId(option.id);   // Enter edit mode for the selected option
        setEditValue(option.parentValue);   // Set the input to the current option's value
    };

    const handleEditSave = async (id) => {

        const updatedOption = {
            contextId: context.id,
            contextValueId: id,
            newName: editValue,
            isActive: true
        }

        try {
            const responce = await UpdateOptionInContext_API(updatedOption);
            setOptionsList(responce.result);
            displayMessage(responce.message);
        } catch (error) {
            console.error('Error updateing option:', error);
            displayMessage('Error updateing options. Please try again.');
        } finally {
            setLoading(false);
        }

        console.log(updatedOption)

        setEditingId(null);   // Exit edit mode
    };

    const handleCancel = () => {
        setEditingId(null);       // Exit edit mode without saving
        setEditValue('');    // Reset editValue
    };

    // Handle adding new options to the list
    const handleAddOption = async () => {

        const newOption = {
            contextId: context.id,
            parentValue: optionInput,
            childValue: null,
            isDefault: false,
            isActive: true
        }

        if (optionInput.trim()) {
            setLoading(true);
            try {
                const responce = await CreateAddOptionInContext_API(newOption);
                console.log(responce)
                setOptionsList(responce.result);
                displayMessage(responce.message);
            } catch (error) {
                console.error('Error fetching custom fields:', error);
                displayMessage('Error fetching custom fields. Please try again.');
            } finally {
                setLoading(false);
            }
            setOptionInput('');
        }

    };

    const EnableOrDisableOption = async (option) => {

        const EnaDisOption = {
            contextId: context.id,
            contextValueId: option.id,
            newName: '',
            isActive: !(option.isActive)
        }

        try {
            const responce = await EnableOrDisableOptionInContext_API(EnaDisOption);
            setOptionsList(responce.result);
            displayMessage(responce.message);
        } catch (error) {
            console.error('Error Enable or Disable option:', error);
            displayMessage('Error Enable or Disable option. Please try again.');
        } finally {
            setLoading(false);
        }

        console.log(EnaDisOption)

        // setOptionsList(optionsList.filter(option => option.id !== id));
    };

    // Handle removing an option from the list
    const handleRemoveOption = async (id) => {

        const deletedOption = {
            contextId: context.id,
            contextValueId: id,
            newName: '',
            isActive: true
        }

        try {
            const responce = await DeleteOptionInContext_API(deletedOption);
            setOptionsList(responce.result);
            displayMessage(responce.message);
        } catch (error) {
            console.error('Error removing option:', error);
            displayMessage('Error removing options. Please try again.');
        } finally {
            setLoading(false);
        }

        console.log(deletedOption)

        // setOptionsList(optionsList.filter(option => option.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        // onAddOption(optionsList); // Pass the updated options list to the parent component
    };

    return (
        <div className="edit-options-container">

            {loading && <div className="loading-indicator">Loading...</div>}

            <div className="header-row-selectFieldType">
                <h3>Edit Options for '{context.name}'</h3>
            </div>

            <p>Reorder the option list below or add a new option for {context.name} </p>

            <ul style={{ padding: 0, marginLeft: 20 }} >
                <li style={{ margin: '5px 0' }}>
                    <span
                        //onClick={() => handleAddNewContext(field)}
                        style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
                    >
                        Sort Options
                    </span>
                </li>
                <li style={{ margin: '5px 0' }}>
                    <span
                        onClick={() => closePage()}
                        style={{ color: 'blue', textDecoration: 'none', cursor: 'pointer' }}
                    >
                        View Custom Field Configuration
                    </span>
                </li>
            </ul>

            {/* <hr /> */}

            <form onSubmit={handleSubmit}>

                <div style={{ marginBottom: '5px' }}>
                    <label style={{ marginBottom: '8px', borderBottom: '1px solid #ccc', paddingBottom: '2px' }}><b>Add New Custom Field Option</b></label>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        <label><strong>Add Option : </strong></label>
                        <input
                            type="text"
                            value={optionInput}
                            onChange={(e) => setOptionInput(e.target.value)}
                            placeholder="Add new option"
                            style={{ marginLeft: '5px', width: '200px', padding: '-5px 5px', height: '40px' }}
                        />
                        <button
                            type="button"
                            className="addOption-field-button"
                            onClick={handleAddOption}
                            style={{ marginLeft: '10px' }}
                        >
                            Add
                        </button>
                    </div>
                    <hr />
                </div>

                <div style={{ marginTop: '15px' }}>
                    <h6>Added Options List:</h6>
                    <table className="custom-field-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>Option</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {optionsList.map((option) => (
                                <tr key={option.id}>
                                    <td>
                                        {editingId === option.id ? (
                                            <input
                                                type="text"
                                                value={editValue}
                                                onChange={(e) => setEditValue(e.target.value)}
                                                style={{ width: '40%' }}
                                            />
                                        ) : (
                                            // option.parentValue
                                            option.isActive ? option.parentValue : `${option.parentValue} (disabled)`
                                        )}
                                    </td>
                                    <td>{option.isActive ? 'Active' : 'Disabled'}</td>
                                    <td>
                                        {editingId === option.id ? (
                                            <>
                                                <span
                                                    onClick={() => handleEditSave(option.id)}
                                                    style={{ color: 'green', cursor: 'pointer', marginRight: '10px', textDecoration: 'underline' }}
                                                >
                                                    Save
                                                </span>
                                                <span
                                                    onClick={handleCancel}
                                                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    Cancel
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    onClick={() => EditContextOption(option)}
                                                    style={{ color: 'blue', cursor: 'pointer', marginRight: '10px', textDecoration: 'underline' }}
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    onClick={() => EnableOrDisableOption(option)}
                                                    style={{ color: option.isActive ? 'red' : 'blue' , cursor: 'pointer', marginRight: '10px', textDecoration: 'underline' }}
                                                >
                                                    {option.isActive ? 'Disable' : 'Enable'}
                                                </span>
                                                <span
                                                    onClick={() => handleRemoveOption(option.id)}
                                                    style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}
                                                >
                                                    Delete
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

                <div className="button-group">
                    {/* <button type="submit" className="create-CustomField-btn">Save Options</button> */}
                    <button type="button" className="cancel-CustomField-btn" onClick={closePage}>Done</button>
                </div>

            </form>

        </div>
    );
};

EditOptions.propTypes = {
    context: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        contextValue: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                parentValue: PropTypes.string.isRequired,
                isActive: PropTypes.bool,
            })
        ).isRequired,
    }).isRequired,
    onModify: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    onAddOption: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
};

export default EditOptions;
