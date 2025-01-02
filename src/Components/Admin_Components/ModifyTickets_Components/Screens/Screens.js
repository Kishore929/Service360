import React, { useEffect, useState } from 'react';
import { getScreens_API } from '../../../API_Services/Admin_Services/Modify_Users_Services/Screens_API';
import AddScreen from './AddScreen';
import ConfigureFieldScreen from './ConfigureFieldScreen';
import EditScreen from './EditScreen';
import { Notification } from '../../../com_index'; // Import Notification component
import './Screens.scss';

const Screens = () => {
  const [screens, setScreens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddScreen, setShowAddScreen] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Fetch screens data from API
  const fetchScreens = async () => {
    setLoading(true);
    try {
      const data = await getScreens_API();
      setScreens(data.result);
    } catch (error) {
      setError('Failed to fetch screens');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScreens();
  }, []);

  const handleAddScreenSuccess = (newScreen) => {
    setScreens((prevScreens) => [...prevScreens, newScreen]);
    setSelectedScreen(newScreen);
    setShowAddScreen(false);
    showNotification('Screen added successfully!');
  };

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleBackClick = () => {
    setSelectedScreen(null);
    setIsEditing(false);
    fetchScreens();
  };

  const handleDropdownToggle = (id) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest('.Screens-dropdown')) {
      setOpenDropdownId(null);
    }
  };

  const handleEditClick = (screen) => {
    setSelectedScreen(screen);
    setIsEditing(true);
    setShowAddScreen(false);
    setOpenDropdownId(null);
  };

  const handleConfigureClick = (screen) => {
    setSelectedScreen(screen);
    setIsEditing(false);
    setOpenDropdownId(null);
  };

  useEffect(() => {
    if (openDropdownId !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdownId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Screen-container" style={{ marginTop: '0px' }}>
      {notification && <Notification message={notification} />}

      {showAddScreen ? (
        <AddScreen
          onCancel={() => setShowAddScreen(false)}
          onSuccess={handleAddScreenSuccess}
          displayMessage={showNotification}
        />
      ) : selectedScreen ? (
        isEditing ? (
          <EditScreen screen={selectedScreen} onBack={handleBackClick} />
        ) : (
          <div>
            <div><button onClick={handleBackClick} className="Screens-add-button">
              Back to Screens
            </button></div>
            <br></br>
           <div> <ConfigureFieldScreen screen={selectedScreen} /></div>
          </div>
        )
      ) : (
        <>
          <div className="Screens-header-row-screen">
            <h4>Screens</h4>
            <button
              className="Screens-add-button"
              onClick={() => setShowAddScreen(true)}
            >
              Add Screen
            </button>
          </div>

          <table className="Screens-table">
            <thead>
              <tr>
                <th scope="col"><h6>Screen Name</h6></th>
                <th scope="col"><h6>ScreenBatches</h6></th>
                <th scope="col"><h6>Actions</h6></th>
              </tr>
            </thead>
            <tbody>
              {screens.map((screen) => (
                <tr key={screen.id} style={{ verticalAlign: 'top' }}>
                  <td
                    onClick={() => setSelectedScreen(screen)}
                    style={{
                      cursor: 'pointer',
                      color: '#007bff',
                      padding: '10px',
                      verticalAlign: 'top'
                    }}
                  >
                    {screen.name}
                    <div style={{ fontSize: 'small', color: '#555' }}>{screen.description}</div>
                  </td>
                  <td>
                    {screen.screenBatches.map(screenBatch => (
                      <div key={screenBatch.id}>
                        <div style={{ fontSize: 'small', color: '#555' }}>{screenBatch.name}</div>
                      </div>
                    ))}
                  </td>
                  <td>
                    <div className="Screens-dropdown">
                      <div
                        className={`Screens-td-3dots ${openDropdownId === screen.id ? 'highlight' : ''}`}
                        onClick={() => handleDropdownToggle(screen.id)}
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </div>
                      {openDropdownId === screen.id && (
                        <div className="Screens-dropdown-menu-simple">
                          <div
                            className="Screens-dropdown-item-screen"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleConfigureClick(screen);
                            }}
                          >
                            Configure
                          </div>
                          <div
                            className="Screens-dropdown-item-screen"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(screen);
                            }}
                          >
                            Edit
                          </div>
                          <div
                            className="Screens-dropdown-item-screen"
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log('Copy clicked');
                            }}
                          >
                            Copy
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Screens;
