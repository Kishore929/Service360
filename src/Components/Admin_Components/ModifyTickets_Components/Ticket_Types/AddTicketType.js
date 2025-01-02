import React, { useState } from 'react';
import { addTicketType_API } from '../../../api_index';
import './TicketTypes.scss'; 

const AddTicketType = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newTicketType = {
      name,
      description,
      isActive: true,
      ticketTypeBatches: [],
    };

    try {
      const response = await addTicketType_API(newTicketType);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.result.message);
        console.log(response.result.message);
      } else {
        setError(response.errorMessage || 'Failed to add ticket type.');
      }
    } catch (error) {
      setError('Error adding ticket type. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Ticket_Type-container"> 
         <div className="Ticket_Type-header-row-tickettype" style={{ marginTop: '19px' }}>
         <h5>Add Ticket Type</h5></div>
      {error && <div className="Ticket_Type-error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="ticket-type-form"> 
        <div>
          <label><h6>Name:</h6></label>
          <br></br>
          <input
            type="text"
            className="Ticket_Type-input"  
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br></br>
          <textarea
            className="Ticket_Type-textarea"  
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit" className="Ticket_Type-add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Save'}
        </button> 
        <button type="button" className="Ticket_Type-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTicketType;
