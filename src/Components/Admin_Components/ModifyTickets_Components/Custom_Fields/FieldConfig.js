import { React, useState } from "react";
import { AddCustomField_API } from '../../../api_index';
import './CustomField.scss';

const FieldConfig = ({ selectedfield, onCancel, onSuccess, displayMessage }) => {

    const [loading, setLoading] = useState(false); // Loading should start as false
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [options, setOptions] = useState('');
    const [optionsList, setOptionsList] = useState([]);
    const [error, setError] = useState('');

    let errorTimeout;

    const handleAddOption = () => {
        if (options.trim()) { // Make sure the input is not empty
            setOptionsList([...optionsList, options]); // Add the input to the array
            setOptions(''); // Clear the input field
            clearTimeout(errorTimeout); // Clear any existing timeout
        }
    };

    const handleRemoveField = (id) => {
        setOptionsList(optionsList.filter((_, index) => index !== id));
        console.log(optionsList);
    };


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior


        if (selectedfield.isOptionsNeeded && optionsList.length === 0) {
            setError("Please add at least one option.");

            errorTimeout = setTimeout(() => {
                setError('');
            }, 3000);

            return; // Stop submission if no options are added
        }

        const fieldData = {
            name,
            description,
            currentFeildTypeId: selectedfield.id,
            isOptionNeeded: selectedfield.isOptionsNeeded,
            optionValues: optionsList
        }

        console.log('Submitting data:', fieldData);

        setLoading(true);
        try {
            const resultMessage = await AddCustomField_API(fieldData);
            onSuccess();
            displayMessage(resultMessage.message);

            console.log(resultMessage.message);

            setTimeout(() => {
                console.log('Form submitted successfully');
                setLoading(false); // Stop loading after the process is done
            }, 2000);

        } catch (error) {
            console.error('Error adding ticket type scheme:', error);
            setLoading(false); // Stop loading if there's an error
        }

    };

    return (
        <div>
            {selectedfield ? (
                <div>
                    <div className="header-row-selectFieldType">
                        <h3>Configure '{selectedfield.typeName}' Field</h3>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="field-config">

                        <div style={{ marginBottom: '15px' }}>
                            <b><label>Field Name:</label></b>
                            <br></br>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <b><label>Description:</label></b>
                            <br></br>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        {selectedfield.isOptionsNeeded &&

                            <div style={{ marginBottom: '15px' }}>
                                <b><label>Options:</label></b>
                                <br></br>

                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="text"
                                        value={options}
                                        onChange={(e) => setOptions(e.target.value)}
                                        style={{ marginLeft: '10px' }}
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

                                {/* Display the list of added options */}
                                <div style={{ marginTop: '30px' }}>
                                    <h6>Added Options:</h6>
                                    <table style={{ width: '200px', borderCollapse: 'collapse' }}>

                                        <tbody>
                                            {optionsList.map((option, index) => (
                                                <tr key={index}>
                                                    <td style={{ padding: '5px', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        {option}
                                                        <button
                                                            onClick={() => handleRemoveField(index)}
                                                            className="remove-field-button"
                                                            style={{ marginLeft: '20px', padding: '3px 5px', cursor: 'pointer' }}
                                                        >
                                                            Remove
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                        }

                        {/* Update button text based on loading state */}
                        <div className="button-group">
                            <button type="submit" className="create-field-button" disabled={loading}>
                                {loading ? 'Creating...' : 'Create'}
                            </button>

                            <button type="button" className="cancel-field-button" onClick={onCancel}>
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            ) : (
                <p>No field selected.</p>
            )}
        </div>
    );
};

export default FieldConfig;
