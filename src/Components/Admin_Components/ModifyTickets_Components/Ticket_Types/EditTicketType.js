import React, { useEffect, useState } from 'react';
import { updateTicketType_API, getTicketTypes_API } from '../../../api_index'; // Make sure to import fetchTicketTypes
import './TicketTypes.scss'; 

const EditTicketType = ({ ticketType, onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [ticketTypes, setTicketTypes] = useState([]); 
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    if (ticketType) {
      setName(ticketType.name);
      setDescription(ticketType.description);
    }
    
    const fetchExistingTicketTypes = async () => {
      try {
        const response = await getTicketTypes_API(); 
        if (response.isSuccess) {
          setTicketTypes(response.result);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching ticket types:', error);
      }
    };

    fetchExistingTicketTypes(); 
  }, [ticketType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); 
    const exists = ticketTypes.some(
      (type) => type.name.toLowerCase() === name.toLowerCase() && type.id !== ticketType.id 
    );

    if (exists) {
      setLoading(false);
      setErrorMessage('This ticket type name already exists. Please choose a different name.');
      return;
    }

    const updatedTicketType = {
      id: ticketType.id,
      name,
      description,
      avatarUrl: ticketType.avatarUrl,
      ticketTypeBatches: ticketType.ticketTypeBatches,
    };

    try {
      const response = await updateTicketType_API(updatedTicketType);
      if (response.isSuccess) {
        onSuccess(); 
        displayMessage(response.message);
        console.log(response.message);
      }
    } catch (error) {
      console.error('Error updating ticket type:', error);
      setErrorMessage('An error occurred. Please try again.'); 
    }

    setLoading(false); 
  };

  return (
    <div className="Ticket_Type-container">
         <div className="Ticket_Type-header-row-tickettype" style={{ marginTop: '15px' }}>
         <h5>Edit Ticket Type</h5></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label><h6>Type Name:</h6></label>
          <br></br>
          <input
            className="Ticket_Type-input"  
            type="text"
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
          <br></br>
          <textarea
            className="Ticket_Type-textarea"  
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <button type="submit" className="button Ticket_Type-add-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button type="button" className="cancel Ticket_Type-cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditTicketType;
