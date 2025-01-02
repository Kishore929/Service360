import React, { useEffect, useState } from 'react';
import { UpdateTicketTypeScreenBatch_API } from '../../../api_index';
import './TTScreenBatches.scss';

const EditTTScreenBatch = ({ batch, onClose, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (batch) {
      setName(batch.name);
      setDescription(batch.description);
    }
  }, [batch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBatch = {
      id: batch.id,
      name,
      description,
    };

    console.log("Data being sent to API:", updatedBatch); // Debugging line

    try {
      const response = await UpdateTicketTypeScreenBatch_API(updatedBatch);

      console.log('API response:', response); // Debugging line

      if (response.isSuccess === 1) {
        onSuccess();
        onClose();
        displayMessage(response.message);
      } else {
        console.error('Error response:', response);
        displayMessage(response.errorMessage || 'Failed to update batch.');
      }
    } catch (error) {
      console.error('Error updating ticket type screen batch:', error);
      displayMessage('Error updating ticket type screen batch.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TTScreenBatches-container">
      <div className="TTScreenBatches-header-row" style={{ marginTop: '19px' }}>
        <h5>Edit Ticket Type Screen Batch</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label><h6>Batch Name:</h6></label>
          <br></br>
          <input
            className="TTScreenBatches-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><h6>Description:</h6></label>
          <br></br>
          <textarea
            className="TTScreenBatches-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div style={{ justifyContent: 'space-between' }}>
          <button type="submit" className="button TTScreenBatches-add-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Batch'}
          </button>
          <button type="button" onClick={onClose} className="cancel TTScreenBatches-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

EditTTScreenBatch.defaultProps = {
  onClose: () => { },
  onSuccess: () => { },
  displayMessage: () => { }
};

export default EditTTScreenBatch;