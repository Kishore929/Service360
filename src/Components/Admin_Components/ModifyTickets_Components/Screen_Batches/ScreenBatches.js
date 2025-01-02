import React, { useEffect, useState } from 'react';
import { getScreenBatches_API } from '../../../API_Services/Admin_Services/Modify_Users_Services/ScreenBatches_API';
import './ScreenBatches.scss';
import AddScreenBatch from './AddScreenBatch';
import EditScreenBatch from './EditScreenBatch';
import ConfigureScreenBatch from './ConfigureScreenBatch';
import { Notification } from '../../../com_index';

const ScreenBatches = () => {
  const [screenBatches, setScreenBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAddScreenBatchVisible, setIsAddScreenBatchVisible] = useState(false);
  const [isEditScreenBatchVisible, setIsEditScreenBatchVisible] = useState(false);
  const [isConfigureScreenBatchVisible, setIsConfigureScreenBatchVisible] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [notification, setNotification] = useState('');


  // Fetch screen batches data
  const fetchScreenBatches = async () => {
    setLoading(true);
    try {
      const data = await getScreenBatches_API();
      if (data.isSuccess) {
        setScreenBatches(data.result);
      } else {
        setError('Failed to fetch data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreenBatches();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Handle actions (Edit, Configure, Delete)
  const handleAction = (action, batchId) => {
    if (action === 'Edit') {
      const batch = screenBatches.find((batch) => batch.id === batchId);
      setSelectedBatch(batch);
      setIsEditScreenBatchVisible(true);
    }
    if (action === 'Configure') {
      const batch = screenBatches.find((batch) => batch.id === batchId);
      setSelectedBatch(batch);
      setIsConfigureScreenBatchVisible(true);
    }
  };

  const handleAddScreenBatchClick = () => {
    setIsAddScreenBatchVisible(true);
  };

  const handleAddScreenBatchCancel = () => {
    setIsAddScreenBatchVisible(false);
  };

  const handleAddScreenBatchSuccess = () => {
    setIsAddScreenBatchVisible(false);
    fetchScreenBatches(); // Refresh data
  };

  const handleEditScreenBatchCancel = () => {
    setIsEditScreenBatchVisible(false);
  };

  const handleEditScreenBatchSuccess = (updatedBatch) => {
    setScreenBatches((prevBatches) =>
      prevBatches.map((batch) => (batch.id === updatedBatch.id ? updatedBatch : batch))
    );
    setIsEditScreenBatchVisible(false);
    fetchScreenBatches(); // Refresh data after edit
  };

  const handleConfigureScreenBatchCancel = () => {
    setIsConfigureScreenBatchVisible(false);
    setSelectedBatch(null);
  };

  // Handle click outside of dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest('.ScreenBatches-dropdown-menu-simple') &&
        !event.target.closest('.ScreenBatches-td-3dots')
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const showNotification = (message) => {
    setNotification(message);
    const timer = setTimeout(() => {
        setNotification('');
    }, 3000);
    return () => clearTimeout(timer);
};


  return (
    <div className="ScreenBatches-container">
      {/* Render Add Screen Batch button */}
      {notification && (<Notification message={notification} />)}

      {!isAddScreenBatchVisible && !isEditScreenBatchVisible && !isConfigureScreenBatchVisible && (
        <div className="ScreenBatches-header-row-SB">
          <h4>Screen Batches</h4>
          <button className="ScreenBatches-add-button" onClick={handleAddScreenBatchClick}>
            Add ScreenBatch
          </button>
        </div>
      )}

      {isAddScreenBatchVisible && (
        <AddScreenBatch onCancel={handleAddScreenBatchCancel} onSuccess={handleAddScreenBatchSuccess} displayMessage={showNotification}/>
      )}

      {isEditScreenBatchVisible && selectedBatch && (
        <EditScreenBatch
          batch={selectedBatch}
          onCancel={handleEditScreenBatchCancel}
          onSuccess={handleEditScreenBatchSuccess}
          displayMessage={showNotification}
        />
      )}

      {isConfigureScreenBatchVisible && selectedBatch && (
        <div>
          <div> 
            <button onClick={handleConfigureScreenBatchCancel} className="ScreenBatches-add-button">
              Back to Screen Batches
            </button>
          </div>
          <br />
          <div>
            <ConfigureScreenBatch screenBatchId={selectedBatch.id} onCancel={handleConfigureScreenBatchCancel} />
          </div>
        </div>
      )}

      {/* Screen Batches table */}
      {!isAddScreenBatchVisible && !isEditScreenBatchVisible && !isConfigureScreenBatchVisible && (
        <table className="ScreenBatches-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th scope="col">
                <h6>Actions</h6>
              </th>
            </tr>
          </thead>
          <tbody>
            {screenBatches.map((batch) => (
              <tr key={batch.id}>
                <td
                  onClick={() => handleAction('Configure', batch.id)}
                  style={{ cursor: 'pointer', color: '#007bff' }}
                >
                  {batch.name || 'N/A'}
                </td>
                <td>{batch.description || 'N/A'}</td>
                <td className="ScreenBatches-td-3dots">
                  <i
                    id={`dropdown-icon-${batch.id}`}
                    className={`fas fa-ellipsis-h ${activeDropdown === batch.id ? 'active' : ''}`}
                    onClick={() => toggleDropdown(batch.id)}
                    style={{ color: activeDropdown === batch.id ? 'blue' : 'black' }}
                  ></i>

                  {activeDropdown === batch.id && (
                    <div className="ScreenBatches-dropdown-menu-simple">
                      <div className="ScreenBatches-dropdown-item-SB" onClick={() => handleAction('Edit', batch.id)}>
                        Edit
                      </div>
                      <div className="ScreenBatches-dropdown-item-SB" onClick={() => handleAction('Delete', batch.id)}>
                        Delete
                      </div>
                      <div className="ScreenBatches-dropdown-item-SB" onClick={() => handleAction('Configure', batch.id)}>
                        Configure
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ScreenBatches;
