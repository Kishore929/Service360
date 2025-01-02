import React, { useState, useEffect } from 'react';
import { addPriority_API, getPriorities_API } from '../../../api_index';
import './Priorities.scss';

const lightenColor = (color, amount) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

const AddPriority = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priorityColorHtmlcode, setPriorityColorHtmlcode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [availableColors, setAvailableColors] = useState([]);
  const [existingNames, setExistingNames] = useState([]);
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const fetchColorsAndNames = async () => {
      try {
        const response = await getPriorities_API();
        if (response.isSuccess) {
          const uniqueColors = [...new Set(response.result.map(priority => priority.priorityColorHtmlcode))];
          setAvailableColors(uniqueColors);
          const names = response.result.map(item => item.name);
          setExistingNames(names);
        } else {
          setError('Failed to fetch colors.');
        }
      } catch (error) {
        setError('Error fetching colors. Please try again.');
      }
    };

    fetchColorsAndNames();
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const toggleColorBox = () => {
    setIsColorBoxOpen((prev) => !prev);
    setIsHighlighted((prev) => !prev);
  };

  const handleColorSelect = (color) => {
    setPriorityColorHtmlcode(color);
    setIsColorBoxOpen(false);
    setIsHighlighted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset error message

    // Check if the name already exists
    if (existingNames.includes(name)) {
      setError('The name already exists. Please choose a different name.');
      setLoading(false);
      return;
    }

    const newPriority = {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      isActive: true,
      id: 0,
      name,
      description,
      avatarUrl: '',
      priorityColorHtmlcode,
      sequenceNumber: 0,
    };

    try {
      const response = await addPriority_API(newPriority);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.result.message);
      } else {
        setError(response.errorMessage || 'Failed to add priority.');
      }
    } catch (error) {
      setError('Error adding priority. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Priorities-container">
      <div className="Priorities-header-row" style={{ marginTop: '19px' }}>
        <h5>Add Priority</h5>
      </div>
      <form onSubmit={handleSubmit} className="priorities-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="Priorities-input"
            value={name}
            onChange={handleNameChange}
            required
          />
      {error && <div className="Priorities-error-message">{error}</div>}

        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br />
          <textarea
            className="Priorities-textarea"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div>
          <label><h6>Select Priority Color:</h6></label>
          <div className="color-selection" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              style={{
                outline: isHighlighted ? '2px solid lightblue' : 'none',
                padding: '3px',
                borderRadius: '5px',
                marginBottom: '5px',
              }}
            >
              <div
                className="color-preview"
                onClick={toggleColorBox}
                style={{
                  backgroundColor: priorityColorHtmlcode || 'transparent',
                  width: '30px',
                  height: '30px',
                  border: '1px solid #000',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              ></div>
            </div>
            {isColorBoxOpen && (
              <div className="color-box" style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '3px',
                border: '1px solid #000',
                padding: '5px',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9',
              }}>
                {availableColors.length > 0 ? (
                  availableColors.map((color, index) => (
                    <div
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      className="color-option"
                      style={{
                        backgroundColor: color,
                        width: '25px',
                        height: '25px',
                        cursor: 'pointer',
                        border: `1px solid ${lightenColor(color, 30)}`,
                        borderRadius: '2px',
                        margin: '0',
                        padding: '0',
                        flexShrink: 0,
                      }}
                    />
                  ))
                ) : (
                  <div>No colors available</div>
                )}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="Priorities-add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Add Priority'}
        </button>
        <button type="button" className="Priorities-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddPriority;
