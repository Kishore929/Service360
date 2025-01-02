import React, { useState, useEffect } from 'react';
import { AddTicketTypeBatch_API, GetTicketTypesForAssociation_API } from "../../../api_index";
import Select from 'react-select';
import './TicketTypeBatches.scss'; 

const AddTicketTypeBatch = ({ onCancel, onSuccess, displayMessage }) => {
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTicketTypesForAssociation = async () => {
      try {
        const response = await GetTicketTypesForAssociation_API();
        if (response.isSuccess) {
          const ticketTypesForAssociation = [...new Set(response.result.map(type => ({ value: type.id, label: type.name })))];
          setTicketTypes(ticketTypesForAssociation);
        }
      } catch (error) {
        console.error('Error fetching ticket types:', error.message);
      }
    };

    fetchTicketTypesForAssociation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name,
      description,
      ticketTypeIds: selectedTicketTypes.map(type => type.value),
      ticketTypes: selectedTicketTypes.map(type => ({
        id: type.value,
        name: type.label,
        description: '',
        avatarUrl: '',
        ticketTypeBatches: [],
      })),
    };

    try {
      const resultMessage = await AddTicketTypeBatch_API(data);
      onSuccess();
      displayMessage(resultMessage.message);
    } catch (error) {
      console.error('Error adding ticket type scheme:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="TT_Batches-container">
      <div className="TT_Batches-header-row-tickettypebatch" style={{ marginTop: '19px' }}>
      <h5>Add Ticket Type Batch</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label><h6>Batch Name:</h6></label>
          <br></br>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="TT_Batches-input"
          />
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br></br>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="TT_Batches-textarea"
          ></textarea>
        </div>

        <div>
          <label><h6>Select Ticket Types:</h6></label>
          <Select
            isMulti
            options={ticketTypes}
            onChange={setSelectedTicketTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select ticket types..."
          />
        </div>
        <br />

        <button type="submit" className="button TT_Batches-add-button" disabled={loading}>
          {loading ? 'adding...' : 'Add Ticket Type'}
        </button>
        
        <button type="button" className="cancel TT_Batches-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddTicketTypeBatch;
