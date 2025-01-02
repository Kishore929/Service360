import React, { useEffect, useState } from 'react';
import { getResolution_API, deleteResolution_API } from '../../../api_index';
import AddResolution from './AddResolution';
import EditResolution from './EditResolution';
import { Notification }from '../../../com_index';
import './Resolutions.scss';

const Resolution = () => {
  const [resolutions, setResolutions] = useState([]);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(''); // State for notifications
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentResolution, setCurrentResolution] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);

  const fetchResolutions = async () => {
    try {
      const response = await getResolution_API();
      setResolutions(response.result || []);
    } catch (err) {
      setError('Failed to load resolutions');
      showNotification('Error fetching resolutions.');
    }
  };

  useEffect(() => {
    fetchResolutions();
  }, []);

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleEditClick = (resolution) => {
    setCurrentResolution(resolution);
    setShowEditForm(true);
    handleDropdownClose();
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this resolution?')) {
      try {
        await deleteResolution_API(id);
        fetchResolutions();
        showNotification('Resolution deleted successfully!'); // Set notification message
        handleDropdownClose();
      } catch (err) {
        setError('Failed to delete resolution');
        showNotification('Error deleting resolution.'); // Set notification message on error
      }
    }
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
    setHighlightedId(id);
  };

  const handleDropdownClose = () => {
    setOpenDropdownId(null);
    setHighlightedId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdownId && !event.target.closest('.Resolutions-dropdown')) {
        handleDropdownClose();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdownId]);

  // Function to show notifications
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(''); // Clear notification after 3 seconds
    }, 3000);
  };

  return (
    <div className="Resolution-container" >
      {notification && <Notification message={notification} />} {/* Display notification */}
      
      {showAddForm ? (
        <AddResolution onCancel={() => setShowAddForm(false)} onSuccess={() => {fetchResolutions()}} displayMessage={showNotification} />
      ) : showEditForm ? (
        <EditResolution resolution={currentResolution} onCancel={() => setShowEditForm(false)} onSuccess={() => {fetchResolutions()}}  displayMessage={showNotification}/>
      ) : (
        <>
          {error && <p>{error}</p>}
          <div className="Resolution-header-row-resolution">
            <h4>Resolutions</h4>
            <button onClick={handleAddClick} className="Resolution-add-resolution-btn">Add Resolution</button>
          </div>
          <table className="Resolution-table">
            <thead>
                <th><h6>Name</h6></th>
                <th><h6>Description</h6></th>
                <th scope="col"><h6>Actions</h6></th>
            </thead>
            <tbody>
              {resolutions.length > 0 ? (
                resolutions.map((resolution) => (
                  <tr key={resolution.id}>
                    <td>{resolution.name}</td>
                    <td style={{ fontSize: 'small', color: '#555' }}>{resolution.description}</td>
                    <td>
                      <div className="Resolutions-dropdown">
                        <div 
                          className={`Resolution-td-3dots ${highlightedId === resolution.id ? 'highlight' : ''}`} 
                          onClick={() => handleDropdownToggle(resolution.id)}
                        >
                          <i className="fas fa-ellipsis-h"></i>
                        </div>
                        {openDropdownId === resolution.id && (
                          <div className="Resolutions-dropdown-menu-simple">
                            <div className="Resolutions-dropdown-item-resolution" onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(resolution);
                            }}>
                              Edit
                            </div>
                            <div className="Resolutions-dropdown-item-resolution" onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(resolution.id);
                            }}>
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No resolutions available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Resolution;
