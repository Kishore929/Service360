import React, { useState, useEffect } from 'react';
import { addTTScreenBatch_API, getScreenBatches_API } from '../../../api_index';
import Select from 'react-select';
import './TTScreenBatches.scss';

const AddTTScreenBatch = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [screenBatchId, setScreenBatchId] = useState(0); // State to hold selected screenBatchId
  const [screenBatches, setScreenBatches] = useState([]); // State to hold fetched screen batches
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScreenBatches = async () => {
      try {
        const response = await getScreenBatches_API();
        if (response.isSuccess === 1) {
          // Map the screen batches to the format required by react-select
          const screenBatchOptions = response.result.map((batch) => ({
            value: batch.id,
            label: batch.name + (batch.description ? ` - ${batch.description}` : ''),
          }));
          setScreenBatches(screenBatchOptions); // Populate screen batches
        } else {
          displayMessage(response.errorMessage || 'Failed to fetch screen batches.');
        }
      } catch (error) {
        console.error('Error fetching screen batches:', error);
        displayMessage('Error fetching screen batches.');
      }
    };

    fetchScreenBatches();
  }, []); // Empty dependency array ensures the API call is made only once when the component mounts

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleScreenBatchChange = (selectedOption) => {
    setScreenBatchId(selectedOption ? selectedOption.value : 0); // Update selected screenBatchId
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBatch = {
      id: 0, // Default value for id
      name,
      description,
      screenBatchId, // Use the selected screenBatchId
    };

    console.log("Data being sent to API:", newBatch); // Debugging line

    try {
      const response = await addTTScreenBatch_API(newBatch);

      console.log('API response:', response); // Debugging line

      if (response.isSuccess === 1) {
        onSuccess();
        displayMessage(response.message || 'Batch added successfully!');
      } else {
        console.error('Error response:', response);
        displayMessage(response.errorMessage || 'Failed to add batch.');
      }
    } catch (error) {
      console.error('Error adding ticket type screen batch:', error);
      displayMessage('Error adding ticket type screen batch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TTScreenBatches-container">
      <div className="TTScreenBatches-header-row" style={{ marginTop: '19px' }}>
        <h5>Add Ticket Type Screen Batch</h5>
      </div>
      <form onSubmit={handleSubmit} className="ttscreenbatch-form">
        <div style={{ marginBottom: '15px' }}>
          <label><h6>Name:</h6></label>
          <br></br>
          <input
            className="TTScreenBatches-input"
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><h6>Description:</h6></label>
          <br></br>
          <textarea
            className="TTScreenBatches-textarea"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><h6>Select Screen Batch:</h6></label>
          <Select
            options={screenBatches}
            onChange={handleScreenBatchChange}
            className="TTScreenBatches-select"
            classNamePrefix="select"
            placeholder="Select screen batch..."
            value={screenBatches.find((batch) => batch.value === screenBatchId) || null}
          />
        </div>

        <div style={{ justifyContent: 'space-between' }}>
          <button type="submit" className="button TTScreenBatches-add-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Batch'}
          </button>
          <button type="button" className="cancel TTScreenBatches-cancel-button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

AddTTScreenBatch.defaultProps = {
  onCancel: () => {},
  onSuccess: () => {},
  displayMessage: () => {},
};

export default AddTTScreenBatch;
