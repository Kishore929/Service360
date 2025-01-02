import React, { useEffect, useState } from 'react';
import { getResolution_API, updateResolution_API } from '../../../api_index';
import './Resolutions.scss';

const EditResolution = ({ resolution, onCancel, onSuccess,displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [resolutions, setResolutions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (resolution) {
      setName(resolution.name);
      setDescription(resolution.description);
    }

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
  }, [resolution]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    const exists = resolutions.some(
      (item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== resolution.id
    );

    if (exists) {
      setLoading(false);
      setErrorMessage('This resolution name already exists. Please choose a different name.');
      return;
    }

    const updatedResolution = {
      id: resolution.id,
      name,
      description: description.trim(), 
    };

    try {
      const response = await updateResolution_API(updatedResolution);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.result.message);
        onCancel(); 
      } else {
        setErrorMessage(response.errorMessage || 'Failed to update resolution.');
      }
    } catch (error) {
      console.error('Error updating resolution:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Resolution-container">
      <div className="Resolution-header-row-resolution">
        <h5>Edit Resolution</h5>
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
              setErrorMessage(''); 
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
            {loading ? 'Updating...' : 'Save'}
          </button>
          <button type="button" className="Resolution-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditResolution;
