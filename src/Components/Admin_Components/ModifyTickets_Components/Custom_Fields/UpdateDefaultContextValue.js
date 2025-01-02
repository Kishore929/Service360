import React, { useState, useEffect } from 'react';
import { UpdateDefaultValueForContext_API } from '../../../api_index';
import PropTypes from 'prop-types';
import './CustomField.scss';

const UpdateDefaultContextValue = ({ context, closePage, displayMessage }) => {
  const [defaultValue, setDefaultValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [contextValues, setContextValues] = useState([]); // Updated to hold the actual default object

  useEffect(() => {
    // Define an inner function to handle async logic
    const fetchDefaultValue = async () => {
      setLoading(true);
      try {
        const defaultCon = context.contextValue.find(item => item.isDefault === true);
        // setDefaultContext(defaultCon);
        setDefaultValue(defaultCon?.parentValue || '');
        const activevalues = context.contextValue.filter(item => item.isActive === true)
        setContextValues(activevalues)
      } catch (error) {
        console.error('Error fetching default value:', error);
        displayMessage('Error fetching default value. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (context) {
      fetchDefaultValue();
    }
  }, [context, displayMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateDefault = { contextId: context.id, contextValueName: defaultValue, isDefault: true };
    setLoading(true);
    try {
      console.log(updateDefault);
      const responce = await UpdateDefaultValueForContext_API(updateDefault);
      displayMessage(responce.message);
      closePage(); // Invoke the success callback if needed
    } catch (error) {
      console.error('Error updating default value:', error);
      displayMessage('Error updating default value. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="update-default-value-container">

      <div className="header-row-selectFieldType">
        <h3>Update Default Value for '{context.name}'</h3>
      </div>

      <form onSubmit={handleSubmit} className="update-default-value-form">

        <p> <strong>Default value is :</strong> {defaultValue || 'No default value set'}</p>

        <div className="form-group" >
          <label><strong>Select a Default Value: </strong></label>
          <select
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            required
            style={{ marginLeft: '10px' }}
          >
            <option value="" disabled>Select a default value</option>
            {contextValues?.map((option, index) => (
              <option key={index} value={option.parentValue}>
                {option.parentValue}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button type="submit" className="create-field-button" disabled={loading}>
            {loading ? 'Updating...' : 'Set Default'}
          </button>

          <button type="button" className="cancel-field-button" onClick={closePage}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

UpdateDefaultContextValue.propTypes = {
  context: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    contextValue: PropTypes.arrayOf(
      PropTypes.shape({
        parentValue: PropTypes.string.isRequired,
        isDefault: PropTypes.bool
      })
    ).isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  displayMessage: PropTypes.func.isRequired,
};

export default UpdateDefaultContextValue;
