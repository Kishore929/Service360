import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getScreenContents_API, updateScreenContent_API, GetCustomFields_API } from '../../../api_index'; // API imports
import './Screens.scss';

const ConfigureFieldScreen = ({ screen }) => {
  const [currentScreen, setCurrentScreen] = useState(screen);
  const [screenContents, setScreenContents] = useState([]);
  const [customFields, setCustomFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch custom fields on component mount
  useEffect(() => {
    const fetchCustomFields = async () => {
      setLoading(true);
      try {
        const response = await GetCustomFields_API();
        if (response.isSuccess) {
          setCustomFields(response.result.map((field) => ({
            value: field.customFieldId,
            label: field.name,
          })));
        } else {
          throw new Error('Failed to fetch custom fields');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomFields();
  }, []);

  // Fetch screen contents
  useEffect(() => {
    const fetchScreenContents = async () => {
      if (currentScreen && currentScreen.id) {
        setLoading(true);
        try {
          const response = await getScreenContents_API(currentScreen.id);
          if (response.isSuccess) {
            setScreenContents(response.result);
          } else {
            throw new Error('Failed to fetch screen contents');
          }
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchScreenContents();
  }, [currentScreen]);

  // Handle dropdown selection and update API call
  const handleDropdownChange = async (selectedOption) => {
    const customFieldId = selectedOption.value;
    const customFieldName = selectedOption.label;
    const sequenceNumber = 1; // Hardcoded for this example

    // Check if the selected custom field already exists in screen contents
    const isFieldAlreadyExists = screenContents.some(
      (content) => content.customFieldName === customFieldName
    );

    if (isFieldAlreadyExists) {
      // Show an alert with the custom field name if it already exists
      alert(`The custom field "${customFieldName}" already exists in the screen.`);
      return; // Do not proceed with the API call
    }

    if (!customFieldId || !currentScreen) return;

    setLoading(true);
    try {
      const response = await updateScreenContent_API(currentScreen.id, customFieldId, sequenceNumber);
      if (response.isSuccess) {
        console.log('Screen content updated successfully');

        // Refresh screen contents
        const updatedResponse = await getScreenContents_API(currentScreen.id);
        if (updatedResponse.isSuccess) {
          setScreenContents(updatedResponse.result);
        } else {
          throw new Error('Failed to fetch updated screen contents');
        }
      } else {
        throw new Error('Failed to update screen content');
      }
    } catch (err) {
      console.error('Error updating screen content:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!currentScreen) return <p>No screen selected. Please select a screen to configure.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="ConfigureFieldScreen Screens-container">
      <h5>Configure Fields For: <span style={{ color: '#3498db' }}>{currentScreen.name}</span></h5>

      {/* Screen Contents */}
      {screenContents.length > 0 ? (
        <div className="ConfigureFieldScreen-details">
          <h5>Screen Fields</h5>
          <table className="Screens-table">
            <thead>
                <th><h6>Field Name</h6></th>
                <th><h6>Field Type</h6></th>
            </thead>
            <tbody>
              {screenContents.map((content) => (
                <tr key={content.fieldId} >
                  <td>{content.customFieldName}</td>
                  <td>{content.customFieldTypeName}</td>
                  {/* <td className="actions">
                    <button 
                      className="remove-button" 
                      onClick={() => alert('Remove functionality not enabled yet')}  
                    >
                      Remove
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No fields configured for this screen.</p>
      )}

      <br />
      {/* Dropdown using react-select */}
      <div>
        <label><h6>Select Custom Field:</h6></label>
        <Select
          className="Screens-select"
          options={customFields}
          onChange={handleDropdownChange}
          placeholder="-- Select a Custom Field --"
          isSearchable
          maxMenuHeight={200}
        />
      </div>
    </div>
  );
};

export default ConfigureFieldScreen;
