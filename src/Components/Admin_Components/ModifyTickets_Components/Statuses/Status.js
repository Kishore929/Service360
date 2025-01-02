import React, { useEffect, useState } from 'react';
import { getStatus_API, deleteStatus_API } from '../../../api_index';
import AddStatus from './AddStatus';
import EditStatus from './EditStatus';
import { Notification } from '../../../com_index';
import "./StatusStyles.scss";

const Status = () => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [notification, setNotification] = useState('');

  const loadStatuses = async () => {
    setLoading(true);
    try {
      const data = await getStatus_API();
      setStatuses(data.result || []);
      setError(null); 
    } catch (err) {
      setError(err.message);
      showNotification('Error fetching statuses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatuses();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleAddSuccess = () => {
    loadStatuses();
    handleCancelAdd();
    showNotification('Status added successfully!'); 
  };

  const handleEditSuccess = () => {
    loadStatuses();
    handleCancelEdit();
    showNotification('Status updated successfully!'); 
  };

  const handleDeleteClick = (status) => {
    if (window.confirm(`Are you sure you want to delete ${status.name}?`)) {
      handleConfirmDelete(status.id);
    }
  };

  const handleConfirmDelete = async (statusId) => {
    try {
      const response = await deleteStatus_API(statusId);
      if (response.isSuccess) {
        setStatuses(statuses.filter(s => s.id !== statusId));
        showNotification(response.message); 
      } else {
        showNotification(`Failed to delete status: ${response.errorMessage}`);
      }
    } catch (error) {
      showNotification('Error deleting status.'); }
  };


  const handleCancelAdd = () => {
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
    setCurrentStatus(null);
  };

  return (
    <div className="Status-container">
      {notification && (<Notification message={notification} />)} 
      
      {showAddForm ? (
        <AddStatus onCancel={handleCancelAdd} onSuccess={handleAddSuccess} displayMessage={showNotification} />
      ) : showEditForm ? (
        <EditStatus status={currentStatus} onCancel={handleCancelEdit} onSuccess={handleEditSuccess} displayMessage={showNotification}/>
      ) : (
        <>
          <div className="Status-header-row">
            <h4>Statuses</h4>
            <button onClick={() => setShowAddForm(true)} className="Status-add-button">Add Status</button>
          </div>

          {loading && <div className="loading-indicator">Loading...</div>}

          <table className="Status-table">
            <thead>
              
                <th><h6>Name</h6></th>
                <th><h6>Status Category</h6></th>
                <th><h6>Actions</h6></th>
             
            </thead>
            <tbody>
              {statuses.length > 0 ? (
                statuses.map((status) => (
                  <tr key={status.id}>
                    <td>{status.name}</td>
                    <td>{status.statusCategory}</td>
                    <td>
                      <span className="Status-action-link" onClick={() => {
                        setCurrentStatus(status);
                        setShowEditForm(true);
                      }}>Edit</span>
                      <span className="Status-action-link" style={{ marginLeft: '10px' }} onClick={() => handleDeleteClick(status)}>Delete</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No statuses available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Status;
