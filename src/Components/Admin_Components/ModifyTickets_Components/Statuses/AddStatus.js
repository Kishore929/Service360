import React, { useState, useEffect, useRef } from 'react';
import { addStatus_API, getStatusCategories_API } from '../../../api_index';
import "./StatusStyles.scss";

const AddStatus = ({ onCancel, onSuccess, displayMessage }) => {
  const [name, setName] = useState('');
  const [statusCategory, setStatusCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false); 
  const dropdownRef = useRef(null); 

  useEffect(() => {
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

    fetchCategories();

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNameChange = (e) => setName(e.target.value);
  const handleStatusCategoryChange = (category) => {
    setStatusCategory(category);
    setDropdownOpen(false); 
    setIsSelected(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newStatus = {
      name,
      statusCategory,
    };

    try {
      const response = await addStatus_API(newStatus);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.result.message);
      } else {
        setError(response.errorMessage || 'Failed to add status.');
      }
    } catch (error) {
      setError('Error adding status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Status-container">
      <div className="Status-header-row" style={{ marginTop: '19px' }}>
        <h5>Add Status</h5>
      </div>
      {error && <div className="Status-error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="status-form">
        <div>
          <label><h6>Name:</h6></label>
          <br />
          <input
            type="text"
            className="Status-input"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label><h6>Status Category:</h6></label>
          <br />
          <div
            ref={dropdownRef} 
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
                  onClick={() => handleStatusCategoryChange(cat.Name)}
                >
                  {cat.Name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <br />
        <button type="submit" className="Status-add-button" disabled={loading}>
          {loading ? 'Adding...' : 'Save'}
        </button>
        <button type="button" className="Status-cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default AddStatus;
