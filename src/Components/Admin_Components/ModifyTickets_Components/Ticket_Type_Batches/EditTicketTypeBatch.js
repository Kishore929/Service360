import React, { useEffect, useState } from 'react';
import { updateTicketTypeBatch_API, GetTicketTypesForAssociation_API } from '../../../api_index';
import Select from 'react-select';
import './TicketTypeBatches.scss';


const EditTicketTypeBatch = ({ ticketType, onClose, onSuccess, displayMessage }) => {
  const [name, setName] = useState(ticketType ? ticketType.name : '');
  const [description, setDescription] = useState(ticketType ? ticketType.description : '');
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchTicketTypesForAssociation = async () => {
      try {
        const response = await GetTicketTypesForAssociation_API();
        if (response.isSuccess) {
          const ticketTypesForAssociation = [...new Set(response.result.map(type => ({ value: type.id, label: type.name })))];
          console.log(ticketTypesForAssociation);
          setTicketTypes(ticketTypesForAssociation);

        }
      } catch (error) {
        console.error('Error fetching ticket types:', error.message);
      }
    };

    fetchTicketTypesForAssociation();
    if (ticketType) {
      setName(ticketType.name);
      setDescription(ticketType.description);
      setSelectedTicketTypes(ticketType.ticketTypes.map(type => ({
        value: type.id,
        label: type.name,
      })));
    }

  }, [ticketType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedTicketType = {
      id: ticketType.id,
      name,
      description,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      isAssociatedtoAnyProject: true,
      ticketTypeIds: selectedTicketTypes.map(type => type.value),
      ticketTypes: selectedTicketTypes.map(type => ({
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        isActive: true,
        id: type.value,
        name: type.label,
        description: '',
        avatarUrl: '',
        ticketTypeBatches: [{ id: 0, name: 'string' }]
      })),
      projects: [{ id: 0, name: 'string', description: 'string' }]
    };

    console.log('Data being sent to API:', updatedTicketType);
    console.log('Selected Ticket Types:', selectedTicketTypes);

    try {
      const response = await updateTicketTypeBatch_API(updatedTicketType);
      console.log('API response:', response);

      if (response.isSuccess === 1) {
        onSuccess();
        onClose();
        displayMessage(response.message);
        console.log('Success message:', response.message);
      } else {
        displayMessage(response.errorMessage);
        console.log('Error message:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error updating ticket type:', error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="TT_Batches-container">
      <div className="TT_Batches-header-row-tickettypebatch" style={{ marginTop: '19px' }}>
        <h5>Edit Ticket Type Batch</h5></div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label ><h6>Type Name:</h6></label>
          <br></br>
          <input
            className="TT_Batches-input"
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
            className="TT_Batches-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label><h6>Select Ticket Types:</h6></label>
          <br></br>
          <Select
            isMulti
            options={ticketTypes}
            value={selectedTicketTypes}
            onChange={setSelectedTicketTypes}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Select ticket types..."
          />
        </div>

        <div style={{ justifyContent: 'space-between' }}>
          <button type="submit" className="button TT_Batches-add-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update Ticket Type'}
          </button>
          <button type="button" onClick={onClose} className="cancel TT_Batches-cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

EditTicketTypeBatch.defaultProps = {
  onClose: () => { },
  onSuccess: () => { },
};

export default EditTicketTypeBatch;