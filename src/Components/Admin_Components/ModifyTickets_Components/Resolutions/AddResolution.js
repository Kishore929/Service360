import React, { useState, useEffect } from 'react';
import { getResolution_API, addResolution_API } from '../../../api_index';
import './Resolutions.scss';

const AddResolution = ({ onCancel, onSuccess,displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [resolutions, setResolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchExistingResolutions = async () => {
      try {
        const response = await getResolution_API();
        if (response.isSuccess) {
          setResolutions(response.result);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching resolutions:', error);
      }
    };

    fetchExistingResolutions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Check if the resolution name already exists
    const exists = resolutions.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      setLoading(false);
      setErrorMessage('This resolution name already exists. Please choose a different name.');
      return;
    }

    const newResolution = {
      name,
      description: description.trim(), // Trim whitespace
    };

    try {
      const response = await addResolution_API(newResolution);
      if (response.isSuccess) {
        onSuccess(); 
        displayMessage(response.result.message);
        onCancel(); 
      } else {
        setErrorMessage(response.errorMessage || 'Failed to add resolution.');
      }
    } catch (error) {
      console.error('Error adding resolution:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Resolution-container">
      <div className="Resolution-header-row-resolution">
        <h5>Add Resolution</h5>
      </div>
      <form onSubmit={handleSubmit} className="resolution-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="Resolution-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage(''); // Clear error message on input change
            }}
            required
          />
          {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br />
          <textarea
            className="Resolution-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" className="Resolution-add-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
          <button type="button" className="Resolution-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResolution;
