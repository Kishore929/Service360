import React, { useState, useEffect } from 'react';
import { getScreenBatchContents_API } from '../../../api_index';  // Importing the API function
import EditDefaultScreenBatch from './EditDefaultScreenBatch';  // Import the EditDefaultScreenBatch component
import './ScreenBatches.scss';  // Importing the SCSS file for styling

const ConfigureScreenBatch = ({ screenBatchId, onClose }) => {
  const [screenBatchData, setScreenBatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);  // State to toggle Edit mode

  useEffect(() => {
    // Fetch screen batch contents when the screenBatchId changes
    const fetchScreenBatchData = async () => {
      try {
        setLoading(true);
        const data = await getScreenBatchContents_API(screenBatchId);
        if (data.isSuccess) {
          setScreenBatchData(data.result);
        } else {
          setErrorMessage('Failed to load screen batch data.');
        }
      } catch (error) {
        setErrorMessage(error.message || 'An error occurred while fetching screen batch data.');
      } finally {
        setLoading(false);
      }
    };

    if (screenBatchId) {
      fetchScreenBatchData();
    }
  }, [screenBatchId]); // Re-fetch whenever screenBatchId changes

  const handleEdit = () => {
    setIsEditing(true);  // Open the EditDefaultScreenBatch component
  };

  const handleUpdate = (updatedData) => {
    // Update the screen batch data with the modified information
    setScreenBatchData(updatedData);
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="ScreenBatches-error-message">{errorMessage}</div>;
  }

  if (!screenBatchData) {
    return <div>No data available for this screen batch.</div>;
  }

  // Destructure the result for easier usage
  const { name, description, defaultScreen, createScreen, editScreen, viewScreen } = screenBatchData;

  return (
    <div className="ScreenBatches-container">
      <h5>Screen Batch: <span style={{ color: '#3498db' }}>{name}</span></h5>
      {/* <p><strong>Description:</strong> {description || 'No description provided'}</p> */}
      
      <table className="ScreenBatches-table">
        <thead>
            <th><h6>Screen Type</h6></th>
            <th><h6>Screen Name</h6></th>
        </thead>
        <tbody>
          <tr>
            <td>Default Screen</td>
            <td>{defaultScreen?.name || 'N/A'}</td>
          </tr>
          <tr>
            <td>Create Screen</td>
            <td>{createScreen?.name || 'N/A'}</td>
          </tr>
          <tr>
            <td>Edit Screen</td>
            <td>{editScreen?.name || 'N/A'}</td>
          </tr>
          <tr>
            <td>View Screen</td>
            <td>{viewScreen?.name || 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      
    </div>
  );
};

export default ConfigureScreenBatch;
