import React, { useEffect, useState, useRef } from 'react';
import { getStatus_API, updateStatus_API, getStatusCategories_API } from '../../../api_index';
import "./StatusStyles.scss";

const EditStatus = ({ status, onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [statusCategory, setStatusCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [statuses, setStatuses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false); // Track if the dropdown is selected
  const dropdownRef = useRef(null); // Ref to track dropdown container

  useEffect(() => {
    if (status) {
      setName(status.name);
      setStatusCategory(status.statusCategory); // Set initial category if provided
    }

    const fetchExistingStatuses = async () => {
      try {
        const response = await getStatus_API();
        if (response.isSuccess) {
          setStatuses(response.result);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching statuses:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await getStatusCategories_API();
        console.log('Fetched Categories:', response);
        if (response.isSuccess) {
          setCategories(response.result);
        } else {
          console.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchExistingStatuses();
    fetchCategories();

    // Close the dropdown when clicking outside of it
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    const exists = statuses.some(
      (item) => item.name.toLowerCase() === name.toLowerCase() && item.id !== status.id
    );

    if (exists) {
      setLoading(false);
      setErrorMessage('This status name already exists. Please choose a different name.');
      return;
    }

    const updatedStatus = {
      id: status.id,
      name,
      statusCategory,
    };

    try {
      const response = await updateStatus_API(updatedStatus);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.message);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('An error occurred. Please try again.');
    }

    setLoading(false);
  };

  const handleCategoryChange = (category) => {
    setStatusCategory(category);
    setDropdownOpen(false); // Close the dropdown after selection
    setIsSelected(true); // Mark as selected
  };

  return (
    <div className="Status-container">
      <div className="Status-header-row" style={{ marginTop: '15px' }}>
        <h5>Edit Status</h5>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label><h6>Status Name:</h6></label>
          <br />
          <input
            className="Status-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage('');
            }}
            required
          />
          {errorMessage && <div style={{ color: 'red', marginTop: '5px' }}>{errorMessage}</div>}
        </div>
        <div>
          <label><h6>Category:</h6></label>
          <br />
          <div
            ref={dropdownRef} // Attach the ref to the dropdown container
            className={`Status-dropdown-container ${isSelected ? 'selected' : ''}`}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="Status-dropdown-selected">
              {statusCategory || 'Select a category'}
              <span>▼</span>
            </div>
            <div className={`Status-dropdown-options ${dropdownOpen ? 'show' : ''}`}>
              {categories.map((cat) => (
                <div
                  key={cat.Name}
                  className="Status-dropdown-option"
                  onClick={() => handleCategoryChange(cat.Name)}
                >
                  {cat.Name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />
        <div>
          <button type="submit" className="button Status-add-button" disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
          <button type="button" className="cancel Status-cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditStatus;
