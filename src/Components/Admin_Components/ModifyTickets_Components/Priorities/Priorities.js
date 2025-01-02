import React, { useEffect, useState } from 'react';
import { getPriorities_API, deletePriority_API } from '../../../api_index';
import AddPriority from './AddPriority';
import EditPriority from './EditPriority';
import { Low, High, Medium, Blocking, Trival } from '../../../com_index';
import { Notification }from '../../../com_index';
import './Priorities.scss';

const Priorities = () => {
  const [priorities, setPriorities] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentPriority, setCurrentPriority] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [highlightedId, setHighlightedId] = useState(null);
  const [notification, setNotification] = useState(''); 

  const iconMap = {
    High: High,
    Low: Low,
    Medium: Medium,
    Trivial: Trival,
    Blocking: Blocking
  };

  const fetchPriorities = async () => {
    try {
      const response = await getPriorities_API();
      setPriorities(response.result || []);
    } catch (err) {
      setError('Failed to load priorities');
    }
  };

  useEffect(() => {
    fetchPriorities();
  }, []);

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleAddClick = (color) => {
    setCurrentPriority({ priorityColorHtmlcode: color });
    setShowAddForm(true);
  };

  const handleEditClick = (priority) => {
    setCurrentPriority(priority);
    setShowEditForm(true);
    handleDropdownClose();
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this priority?')) {
      try {
        await deletePriority_API(id);
        fetchPriorities(); 
        showNotification('Priority deleted successfully!'); // Notify on success
        handleDropdownClose();
      } catch (err) {
        showNotification('Failed to delete priority'); // Notify on error
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
      if (openDropdownId && !event.target.closest('.Priorities-dropdown')) {
        handleDropdownClose();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openDropdownId]);

  return (
    <div className="Priorities-container">
      {notification && <Notification message={notification} />} {/* Display notification */}
      
      {showAddForm ? (
        <AddPriority 
          onCancel={() => setShowAddForm(false)} 
          onSuccess={() => {
            fetchPriorities(); // Refresh priorities after adding
            showNotification('Priority added successfully!'); // Notify on success
            setShowAddForm(false);
          }} 
          displayMessage={showNotification} 
          priorityColorHtmlcode={currentPriority.priorityColorHtmlcode} 
        />
      ) : showEditForm ? (
        <EditPriority 
          priority={currentPriority} 
          onCancel={() => setShowEditForm(false)} 
          onSuccess={() => {
            fetchPriorities(); // Refresh after editing
            showNotification('Priority updated successfully!'); // Notify on success
          }} 
          displayMessage={showNotification} 
        />
      ) : (
        <>
          <div className="Priorities-header-row-priority">
            <h4>Priorities</h4>
            <button onClick={() => handleAddClick('#FF5733')} className="Priorities-add-priority-btn">Add Priority</button>
          </div>
          {error && <p>{error}</p>}
          <table className="Priorities-table">
            <thead>
              
                <th><h6>Name</h6></th>
                <th><h6>Description</h6></th>
                <th><h6>Color</h6></th>
                <th><h6>Actions</h6></th>
            </thead>
            <tbody>
              {priorities.length > 0 ? (
                priorities.map((priority) => (
                  <tr key={priority.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {iconMap[priority.name] && (
                          <img 
                            src={iconMap[priority.name]} 
                            alt={priority.name} 
                            style={{ width: '20px', height: '20px', marginRight: '8px' }} 
                          />
                        )}
                        {priority.name}
                      </div>
                    </td>
                    <td style={{ fontSize: 'small', color: '#555' }}>{priority.description}</td>
                    <td>
                      <div 
                        style={{ 
                          display: 'inline-block', 
                          width: '16px', 
                          height: '16px', 
                          backgroundColor: priority.priorityColorHtmlcode, 
                          marginRight: '8px', 
                          borderRadius: '2px' 
                        }} 
                      />
                    </td>
                    <td>
                      <div className="Priorities-dropdown">
                        <div 
                          className={`Priorities-td-3dots ${highlightedId === priority.id ? 'highlight' : ''}`} 
                          onClick={() => handleDropdownToggle(priority.id)}
                        >
                          <i className="fas fa-ellipsis-h"></i>
                        </div>
                        {openDropdownId === priority.id && (
                          <div className="Priorities-dropdown-menu-simple">
                            <div className="Priorities-dropdown-item-priority" onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(priority);
                            }}>
                              Edit
                            </div>
                            <div className="Priorities-dropdown-item-priority" onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(priority.id);
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
                  <td colSpan="4">No priorities available</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Priorities;
