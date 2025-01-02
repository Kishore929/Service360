import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { getScreens_API, updateScreenBatch_API, getScreenBatchContents_API } from '../../../api_index';
import './ScreenBatches.scss';

const EditScreenBatch = ({ batch, onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState(batch?.name || '');
  const [description, setDescription] = useState(batch?.description || '');
  const [defaultScreenId, setDefaultScreenId] = useState(null);
  const [editTicketTypeId, setEditTicketTypeId] = useState(null);
  const [viewTicketTypeId, setViewTicketTypeId] = useState(null);
  const [createScreenId, setCreateScreenId] = useState(null);
  const [existingScreens, setExistingScreens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [screenBatchDetails, setScreenBatchDetails] = useState(null);

  useEffect(() => {
    const fetchBatchDetails = async () => {
      try {
        const response = await getScreenBatchContents_API(batch.id);
        if (response.isSuccess) {
          const { result } = response;
          setScreenBatchDetails(result);
          setName(result.name);
          setDescription(result.description);
          setDefaultScreenId(result.defaultScreen?.id || null);
          setCreateScreenId(result.createScreen?.id || null);
          setEditTicketTypeId(result.editScreen?.id || null);
          setViewTicketTypeId(result.viewScreen?.id || null);
        } else {
          setErrorMessage(response.errorMessage || 'Failed to fetch batch details');
        }
      } catch (error) {
        setErrorMessage('Error fetching batch details');
      }
    };

    if (batch?.id) {
      fetchBatchDetails();
    }
  }, [batch]);

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
    setErrorMessage(''); // Clear any previous error message before starting the request
    setNameError(''); 

    const exists = existingScreens.some(
      (screen) => screen.name.toLowerCase() === name.toLowerCase() && screen.id !== batch.id
    );

    if (exists) {
      setLoading(false);
      setNameError('This screen batch name already exists. Please choose a different name.');
      return; 
    }

    const updatedBatch = {
      id: batch.id,
      name: name.trim(),
      description: description.trim(),
      defaultScreenId,
      editScreenId: editTicketTypeId,
      viewScreenId: viewTicketTypeId,
      createScreenId,
    };

    try {
      const response = await updateScreenBatch_API(updatedBatch);

      if (response.isSuccess) {
        displayMessage(response.result.message);
        onSuccess(updatedBatch); 
        onCancel(); 
        setErrorMessage('');  // Clear error message after successful update
      } else {
        setErrorMessage(response.errorMessage || 'Failed to update screen batch.');
      }
    } catch (error) {
      console.error('Error updating screen batch:', error);
      setErrorMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const screenOptions = existingScreens.map((screen) => ({
    value: screen.id,
    label: screen.name,
  }));

  return (
    <div className="ScreenBatches-container">
      <div className="ScreenBatches-header-row-SB">
        <h5>Edit Screen Batch</h5>
      </div>
      {errorMessage && <div className="ScreenBatches-error-message">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="ScreenBatches-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="ScreenBatches-input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError(''); 
            }}
            required
          />
          {nameError && <div className="ScreenBatches-error-message">{nameError}</div>} 
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

        <div>
          <label><h6>Select Default Screen:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === defaultScreenId) || null}
            onChange={(selectedOption) => setDefaultScreenId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Default Screen--"
          />
        </div>
        <div>
          <label><h6>Create Screen:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === createScreenId) || null}
            onChange={(selectedOption) => setCreateScreenId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Create Screen--"
          />
        </div>
        <div>
          <label><h6>Edit Ticket:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === editTicketTypeId) || null}
            onChange={(selectedOption) => setEditTicketTypeId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select Edit Ticket Type--"
          />
        </div>

        <div>
          <label><h6>View Screen:</h6></label>
          <br />
          <Select
            options={screenOptions}
            value={screenOptions.find(option => option.value === viewTicketTypeId) || null}
            onChange={(selectedOption) => setViewTicketTypeId(selectedOption ? selectedOption.value : null)}
            className="ScreenBatches-select"
            placeholder="--Select View Screen--"
          />
        </div>

        <button type="submit" className="ScreenBatches-add-button" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
        <button type="button" className="ScreenBatches-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditScreenBatch;
