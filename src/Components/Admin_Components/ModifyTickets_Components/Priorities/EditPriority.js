import React, { useEffect, useState } from 'react';
import { updatePriority_API, getPriorities_API } from '../../../api_index';
import './Priorities.scss';

const lightenColor = (color, amount) => {
  const num = parseInt(color.slice(1), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
};

const EditPriority = ({ priority, onCancel, onSuccess,displayMessage }) => {
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    priorityColorHtmlcode: '',
  });
  const [loading, setLoading] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [existingNames, setExistingNames] = useState([]);
  const [error, setError] = useState('');
  const [isColorBoxOpen, setIsColorBoxOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    if (priority) {
      setFormValues({
        name: priority.name,
        description: priority.description,
        priorityColorHtmlcode: priority.priorityColorHtmlcode.trim(),
      });
    }
  }, [priority]);

  const fetchAvailableColors = async () => {
    try {
      const response = await getPriorities_API();
      if (response.isSuccess) {
        const uniqueColors = [...new Set(response.result.map(item => item.priorityColorHtmlcode))];
        setAvailableColors(uniqueColors);
        const names = response.result.map(item => item.name);
        setExistingNames(names);
      } else {
        console.error('Failed to fetch colors.');
      }
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  useEffect(() => {
    fetchAvailableColors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setError(''); // Reset error message on input change
  };

  const handleColorSelect = (color) => {
    setFormValues((prev) => ({ ...prev, priorityColorHtmlcode: color }));
    setIsColorBoxOpen(false);
    setIsHighlighted(false);
  };

  const handleToggleColorBox = () => {
    setIsColorBoxOpen((prev) => !prev);
    setIsHighlighted((prev) => !prev);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the name already exists, but ignore the current priority name
    if (existingNames.includes(formValues.name) && formValues.name !== priority.name) {
      setError('The name already exists. Please choose a different name.');
      setLoading(false);
      return;
    }

    const updatedPriority = {
      ...formValues,
      id: priority.id,
      created: priority.created,
      updated: new Date().toISOString(),
      isActive: priority.isActive,
      sequenceNumber: priority.sequenceNumber,
      avatarUrl: priority.avatarUrl || '',
    };

    try {
      const response = await updatePriority_API(updatedPriority);
      if (response.isSuccess) {
        onSuccess(); 
        displayMessage(response.result.message);


        onCancel(); // Close the edit form
      }
    } catch {
      // Handle error if necessary
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Priorities-container">
      <div className="Priority-header-row" style={{ marginTop: '19px' }}>
        <h5>Edit Priority</h5>
      </div>
      <form onSubmit={handleEdit} className="priorities-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            className="Priorities-input"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
          {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
        </div>
        <div>
          <label><h6>Description:</h6></label>
          <br />
          <textarea
            className="Priorities-textarea"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label><h6>Select Priority Color:</h6></label>
          <div className="color-selection" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div
              className="color-preview"
              onClick={handleToggleColorBox}
              style={{
                backgroundColor: formValues.priorityColorHtmlcode || 'transparent',
                width: '30px',
                height: '30px',
                border: '1px solid #000',
                marginBottom: '5px',
                borderRadius: '2px',
                outline: isHighlighted ? '2px solid lightblue' : 'none',
              }}
            ></div>
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
                {availableColors.map((color, index) => (
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
                ))}
              </div>
            )}
          </div>
        </div>
        <button type="submit" className="Priorities-add-button" disabled={loading}>
          {loading ? 'Editing...' : 'Update Priority'}
        </button>
        <button type="button" className="Priorities-cancel-button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPriority;
