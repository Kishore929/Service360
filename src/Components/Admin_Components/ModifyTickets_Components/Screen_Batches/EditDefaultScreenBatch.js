import React, { useState, useEffect } from 'react';
import { getScreens_API } from '../../../api_index';  // Fetch available screens
import { updateScreenBatch_API } from '../../../api_index';  // Update the screen batch API
import './ScreenBatches.scss';

const EditDefaultScreenBatch = ({ screenBatchData, onClose, onUpdate }) => {
  const [screens, setScreens] = useState([]);
  const [selectedDefaultScreen, setSelectedDefaultScreen] = useState(screenBatchData.defaultScreen?.id || 0);

  useEffect(() => {
    const fetchScreens = async () => {
      try {
        const data = await getScreens_API();
        if (data.isSuccess) {
          setScreens(data.result);
        } else {
          console.error('Failed to fetch screens');
        }
      } catch (error) {
        console.error('Error fetching screens:', error);
      }
    };

    fetchScreens();
  }, []);

  const handleSave = async () => {
    const updatedBatch = {
      ...screenBatchData,  // Include existing data
      defaultScreen: { id: selectedDefaultScreen },
    };

    try {
      const response = await updateScreenBatch_API(updatedBatch);
      if (response.isSuccess) {
        onUpdate(updatedBatch);  // Trigger the update on the parent component
        onClose();   // Close the edit dialog
      } else {
        console.error('Failed to update default screen:', response.errorMessage);
      }
    } catch (error) {
      console.error('Error updating default screen:', error);
    }
  };

  return (
    <div className="edit-screen-batch-modal">
      <h3>Edit Default Screen</h3>
      
      <label>Select Default Screen</label>
      <select
        value={selectedDefaultScreen}
        onChange={(e) => setSelectedDefaultScreen(e.target.value)}
        className="ScreenBatches-input"
      >
        {screens.map((screen) => (
          <option key={screen.id} value={screen.id}>
            {screen.name}
          </option>
        ))}
      </select>

      <div className="modal-actions">
        <button onClick={handleSave} className="ScreenBatches-add-button">Save</button>
        <button onClick={onClose} className="ScreenBatches-cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default EditDefaultScreenBatch;
