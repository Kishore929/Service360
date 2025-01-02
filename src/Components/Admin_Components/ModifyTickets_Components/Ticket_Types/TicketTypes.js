import React, { useEffect, useState } from 'react';
import { getTicketTypes_API, deleteTicketType_API } from '../../../api_index';
import AddTicketType from './AddTicketType';
import EditTicketType from './EditTicketType';
import { Notification } from '../../../com_index';
import './TicketTypes.scss';

const TicketTypes = () => {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentTicketType, setCurrentTicketType] = useState(null);
  const [notification, setNotification] = useState('');

  const loadTicketTypes = async () => {
    setLoading(true);
    try {
      const data = await getTicketTypes_API();
      setTicketTypes(data.result || []);
    } catch (err) {
      setError(err.message);
      showNotification('Error fetching ticket types. Please try again.');
    } finally {
      setLoading(false);
      const timer = setTimeout(() => {
        setNotification('');
      }, 3000);

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  };

  useEffect(() => {
    loadTicketTypes();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleAddSuccess = () => {
    loadTicketTypes();
    handleCancelAdd();
  };

  const handleEditSuccess = () => {
    loadTicketTypes();
    handleCancelEdit();
  };

  const handleEditClick = (id) => {
    const ticketType = ticketTypes.find((type) => type.id === id);
    setCurrentTicketType(ticketType);
    setShowEditForm(true);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setCurrentTicketType(null);
  };

  const handleDeleteClick = (ticketType) => {
    if (window.confirm(`Are you sure you want to delete ${ticketType.name}?`)) {
      handleConfirmDelete(ticketType.id);
    }
  };

  const handleConfirmDelete = async (ticketTypeId) => {
    try {
      const response = await deleteTicketType_API(ticketTypeId);
      if (response.isSuccess) {
        setTicketTypes(ticketTypes.filter(type => type.id !== ticketTypeId));
        showNotification(response.message);
      } else {
        console.error(`Failed to delete ticket type: ${response.errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting ticket type:', error);
    }
  };

  return (
    <div className="Ticket_Type-container">

      
        {notification && (<Notification message={notification} />)}
        {showAddForm ? (
          <AddTicketType onCancel={handleCancelAdd} onSuccess={handleAddSuccess} displayMessage={showNotification} />
        ) : showEditForm ? (
          <EditTicketType ticketType={currentTicketType} onCancel={handleCancelEdit} onSuccess={handleEditSuccess} displayMessage={showNotification} />
        ) : (
          <>
              <div className="Ticket_Type-header-row-tickettype">
                <h4>Ticket Types</h4>

                <button onClick={handleAddClick} className="Ticket_Type-add-tickettype-btn">Add Ticket Type</button>

              </div>
              {loading && <div className="loading-indicator">Loading...</div>}

              <table className="Ticket_Type-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                 
                    <th><h6>Name</h6></th>
                    <th><h6>Associate Ticket Type</h6></th>
                    <th><h6>Actions</h6></th>
                </thead>
                <tbody>
                  {ticketTypes.length > 0 ? (
                    ticketTypes.map((ticketType) => (
                      <tr key={ticketType.id}>
                        <td style={{color:'#007bff'}}>
                        {ticketType.name}
                          <div style={{ fontSize: 'small',color: '#555' }}>
                            {ticketType.description}
                          </div>
                        </td>
                        <td style={{ fontSize: 'small',color: '#555' }}>
                          {ticketType.ticketTypeBatches.length > 0 ? (
                            ticketType.ticketTypeBatches.map((batch, index) => (
                              <div key={index}>{batch.name}</div>
                            ))
                          ) : null}
                        </td>
                        <td>
                          <span className="Ticket_Type-action-link" onClick={() => handleEditClick(ticketType.id)}>Edit</span>
                          <span className="Ticket_Type-action-link" style={{ marginLeft: '10px' }} onClick={() => handleDeleteClick(ticketType)}>Delete</span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No ticket types available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
      )}

          </div>

        );
};

        export default TicketTypes;
