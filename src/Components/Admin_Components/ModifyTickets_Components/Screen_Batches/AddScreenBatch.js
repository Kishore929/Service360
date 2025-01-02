import React, { useState, useEffect } from 'react';
import { addScreenBatch_API, getScreens_API } from '../../../api_index';
import Select from 'react-select';  // Ensure this import is correct
import './ScreenBatches.scss';

const AddScreenBatch = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [defaultScreenId, setDefaultScreenId] = useState(null);
  const [editTicketTypeId, setEditTicketTypeId] = useState(null);
  const [viewTicketTypeId, setViewTicketTypeId] = useState(null);
  const [createScreenId, setCreateScreenId] = useState(null); // New state for Create Screen
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [existingScreens, setExistingScreens] = useState([]);

  // Fetch existing screens on mount
  useEffect(() => {
    const fetchExistingScreens = async () => {
      try {
        const response = await getScreens_API();
        if (response.isSuccess) {
          setExistingScreens(response.result || []);
        } else {
          console.error('Error fetching existing screens:', response.errorMessage);
          setErrorMessage(response.errorMessage || 'Failed to fetch screens.');
        }
      } catch (error) {
        console.error('Error fetching existing screens:', error);
        setErrorMessage('An error occurred while fetching screens.');
      }
    };

    fetchExistingScreens();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear error before submitting the form

    // Validate required fields
    if (!name.trim()) {
      setLoading(false);
      setErrorMessage('Name is required.');
      return;
    }

    // Construct the payload
    const newScreenBatch = {
      id: 0, // Assuming this is being set automatically by the API
      name: name.trim(),
      description: description.trim(),
      defaultScreenId,
      editScreenId: editTicketTypeId,
      viewScreenId: viewTicketTypeId,
      createScreenId, // The new screen ID
    };

    try {
      const response = await addScreenBatch_API(newScreenBatch);

      // Clear any error message if API call is successful
      if (response.isSuccess) {
        // Display success message and call onSuccess
        displayMessage(response.result.message);
        onSuccess();

        // Reset form fields
        setName('');
        setDescription('');
        setDefaultScreenId(null);
        setEditTicketTypeId(null);
        setViewTicketTypeId(null);
        setCreateScreenId(null); // Reset Create Screen state
        setErrorMessage(''); // Clear error message after success
      } else {
        // If the API returns an error message, set it
        setErrorMessage(response?.errorMessage || 'Failed to add screen batch.');
      }
    } catch (error) {
      // Handle unexpected errors
      console.error('Error adding screen batch:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Options for Select dropdown
  const screenOptions = existingScreens.map((screen) => ({
    value: screen.id,
    label: screen.name,
  }));

  return (
    <div className="ScreenBatches-container">
      <h5>{'Add Screen Batch'}</h5>

      {/* Display error message if there's any */}
      {errorMessage && <div className="ScreenBatches-error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="ScreenBatches-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="ScreenBatches-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br />
          <textarea
            className="ScreenBatches-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* Using react-select for Default Screen selection */}
        <div>
          <label><h6>Select Default Screen:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === defaultScreenId) || null}
            onChange={(selectedOption) => setDefaultScreenId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Default Screen--"
            isSearchable
            maxMenuHeight={200}
          />
        </div>

        {/* New Dropdown for Create Screen */}
        <div>
          <label><h6>Create Screen:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === createScreenId) || null}
            onChange={(selectedOption) => setCreateScreenId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Create Screen--"
            isSearchable
            maxMenuHeight={200}
          />
        </div>

        {/* Using react-select for Edit Ticket Type */}
        <div>
          <label><h6>Edit Ticket:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === editTicketTypeId) || null}
            onChange={(selectedOption) => setEditTicketTypeId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Edit Ticket Type--"
            isSearchable
            maxMenuHeight={200}
          />
        </div>

        {/* Using react-select for View Ticket Type */}
        <div>
          <label><h6>View Ticket:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === viewTicketTypeId) || null}
            onChange={(selectedOption) => setViewTicketTypeId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select View Ticket Type--"
            isSearchable
            maxMenuHeight={200}
          />
        </div>
        <br />
        <button type="submit" className="ScreenBatches-add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Save'}
        </button>
        <button type="button" className="ScreenBatches-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddScreenBatch;
