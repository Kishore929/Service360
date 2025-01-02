import React, { useState, useEffect } from 'react';
import { addScreen_API, getScreens_API } from '../../../api_index';
import './Screens.scss';

const AddScreen = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [existingScreens, setExistingScreens] = useState([]);

  useEffect(() => {
    const fetchExistingScreens = async () => {
      try {
        const response = await getScreens_API();
        if (response.isSuccess) {
          setExistingScreens(response.result || []);
        } else {
          console.error('Error fetching existing screens:', response.errorMessage);
        }
      } catch (error) {
        console.error('Error fetching existing screens:', error);
      }
    };

    fetchExistingScreens();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    // Check if the screen name already exists
    const screenNameExists = existingScreens.some(
      (screen) => screen?.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (screenNameExists) {
      setLoading(false);
      setErrorMessage('A screen with this name already exists. Please choose a different name.');
      return;
    }

    const newScreen = {
      name: name.trim(),
      description: description.trim(),
    };

    try {
      const response = await addScreen_API(newScreen);

      if (response.isSuccess) {
        displayMessage(response.result.message);

        // Pass the new screen to the onSuccess function and navigate
        onSuccess(response.result);
        onCancel();  // Close the form
        setName('');
        setDescription('');
        setErrorMessage('');
      } else {
        setErrorMessage(response.errorMessage || 'Failed to add screen.');
      }
    } catch (error) {
      console.error('Error adding screen:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Screens-container">
      <div className="Screens-header-row" style={{ marginTop: '19px' }}>
        <h5>Add Screen</h5>
      </div>
      {errorMessage && <div className="Screens-error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit} className="screen-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="Screens-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br />
          <textarea
            className="Screens-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit" className="Screens-add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Save'}
        </button>
        <button type="button" className="Screens-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddScreen;
