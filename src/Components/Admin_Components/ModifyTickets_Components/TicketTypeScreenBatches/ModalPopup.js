import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { getScreenBatches_API, getTicketTypes_API, associateTicketTypeWithScreenBatch_API } from '../../../api_index';
import './TTScreenBatches.scss';

Modal.setAppElement('#root');

function ModalPopup({ isOpen, onClose, ticketTypeScreenBatchId, onDataAdded }) {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [screenBatches, setScreenBatches] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [selectedScreenBatch, setSelectedScreenBatch] = useState('');

  useEffect(() => {
    getTicketTypes_API()
      .then(response => {
        if (response.isSuccess) {
          setTicketTypes(response.result);
        } else {
          console.error('Error fetching ticket types:', response.errorMessage);
        }
      })
      .catch(error => console.error('Error fetching ticket types:', error));
  }, []);

  useEffect(() => {
    getScreenBatches_API()
      .then(response => {
        if (response.isSuccess) {
          setScreenBatches(response.result);
        } else {
          console.error('Error fetching screen batches:', response.errorMessage);
        }
      })
      .catch(error => console.error('Error fetching screen batches:', error));
  }, []);

  const handleSubmit = () => {
    if (!selectedTicketType || !selectedScreenBatch) {
      alert('Please select both ticket type and screen batch.');
      return;
    }

    const payload = {
      id: 0,
      screenBatchId: selectedScreenBatch,
      ticketTypeId: selectedTicketType,
      ticketTypeScreenBatchId: ticketTypeScreenBatchId,
    };

    associateTicketTypeWithScreenBatch_API(payload)
      .then(data => {
        console.log('Data submitted successfully:', data);
        onDataAdded();  
        onClose();  
      })
      .catch(error => console.error('Error submitting data:', error));
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Data Modal"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          width: '450px', 
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <h6>Select Ticket Type and Screen Batch</h6>
      <div>
        <label htmlFor="ticketTypeDropdown"><h6>Ticket Type:</h6></label>
        <br />
        <select
          className='TTScreenBatches-DropSelect'
          id="ticketTypeDropdown"
          value={selectedTicketType}
          onChange={(e) => setSelectedTicketType(e.target.value)}
        >
          <option value="">Select a ticket type</option>
          {ticketTypes.map((ticket) => (
            <option key={ticket.id} value={ticket.id}>
              {ticket.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="screenBatchDropdown"><h6>Screen Batch:</h6></label>
        <br />
        <select 
          className='TTScreenBatches-DropSelect'
          id="screenBatchDropdown"
          value={selectedScreenBatch}
          onChange={(e) => setSelectedScreenBatch(e.target.value)}
        >
          <option value="">Select a screen batch</option>
          {screenBatches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.name}
            </option>
          ))}
        </select>
      </div>
<br></br>
      <div>
        <button onClick={handleSubmit} type="submit" className="button TTScreenBatches-add-button">Submit</button>
        <button onClick={onClose} type="button" className="cancel TTScreenBatches-cancel-button">Close</button>
      </div>
    </Modal>
  );
}

export default ModalPopup;
