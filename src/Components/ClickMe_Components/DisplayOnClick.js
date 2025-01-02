import React, { useState, useEffect } from 'react';
import { getProjectsWithTicketTypes_API, getCustomFieldsForCreateTicket_API } from '../api_index';
import Select from 'react-select';
import './DisplayClickMePage.scss';

const DisplayClickMePage = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState(null);
  const [customFields, setCustomFields] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch projects with ticket types
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjectsWithTicketTypes_API();
        if (data.isSuccess) {
          setProjects(data.result);
        } else {
          setErrorMessage(data.message || 'Failed to fetch projects');
        }
      } catch (error) {
        setErrorMessage('Error fetching projects');
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (selectedOption) => {
    setErrorMessage('');
    const projectId = selectedOption?.value || null;
    const project = projects.find((p) => p.projectId === projectId);
    setSelectedProject(project);
    setTicketTypes(project?.ticketTypes || []);
    setSelectedTicketType(null);
    setCustomFields([]);
  };

  const handleTicketTypeChange = async (selectedOption) => {
    setErrorMessage('');
    setSelectedTicketType(selectedOption);
    const ticketTypeId = selectedOption.value;

    try {
      const data = await getCustomFieldsForCreateTicket_API(selectedProject.projectId, ticketTypeId);
      if (data.isSuccess) {
        setCustomFields(data.result || []);

        if (!data.result || data.result.length === 0) {
          setErrorMessage('No custom fields available for this ticket type.');
        }
      } else {
        setErrorMessage(data.message || 'Failed to fetch custom fields');
      }
    } catch (error) {
      setErrorMessage('Error fetching custom fields');
      console.error('Error fetching custom fields:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedProject || !selectedTicketType) {
      alert('Please complete all required selections!');
      return;
    }
    setFormSubmitted(true);
  };

  const renderCustomField = (field) => {
    const isDisabled = field.contextValues?.length === 0;
    const options = field.contextValues?.map((value) => ({
      value: value.contextValueId,
      label: `${value.name}${value.description ? ` - ${value.description}` : ''}`,
    })) || [];

    switch (field.typeName) {
      case 'Multi Line Text': // Multi-line dropdown
        return (
          <Select
            key={field.fieldId}
            options={options}
            isDisabled={isDisabled}
            placeholder={isDisabled ? `${field.name} (Not available)` : `Select ${field.name}`}
            className="DisplayClickMePage-select"
            isMulti={true}
          />
        );
      case 'Single Line Text': // Single-line text input
        return (
          <input
            key={field.fieldId}
            type="text"
            disabled={isDisabled}
            placeholder={`Enter ${field.name}`}
            className="DisplayClickMePage-input"
          />
        );
      case 'Cascading Select': // Dropdown for cascading select
        return (
          <Select
            key={field.fieldId}
            options={options}
            isDisabled={isDisabled}
            placeholder={isDisabled ? `${field.name} (Not available)` : `Select ${field.name}`}
            className="DisplayClickMePage-select"
          />
        );
      case 'Labels': // Dropdown for labels
        return (
          <Select
            key={field.fieldId}
            options={options}
            isDisabled={isDisabled}
            placeholder={isDisabled ? `${field.name} (Not available)` : `Select ${field.name}`}
            className="DisplayClickMePage-select"
          />
        );
      default:
        return null;
    }
  };

  const projectOptions = projects.map((project) => ({
    value: project.projectId,
    label: project.name,
  }));

  const ticketTypeOptions = ticketTypes.map((ticketType) => ({
    value: ticketType.id,
    label: ticketType.name,
  }));

  return (
    <div className="DisplayClickMePage-container">
      <h3 className="DisplayClickMePage-title">Dynamic Form</h3>

      {/* Error Message */}
      {errorMessage && <div className="DisplayClickMePage-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="DisplayClickMePage-form">
        {/* Project Dropdown */}
        <div className="DisplayClickMePage-field">
          <label>Project:</label>
          <Select
            options={projectOptions}
            value={projectOptions.find((option) => option.value === selectedProject?.projectId) || null}
            onChange={handleProjectChange}
            placeholder="-- Select Project --"
            className="DisplayClickMePage-select"
          />
        </div>

        {/* Ticket Type Dropdown */}
        <div className="DisplayClickMePage-field">
          <label>Ticket Type:</label>
          <Select
            options={ticketTypeOptions}
            value={ticketTypeOptions.find((option) => option.value === selectedTicketType?.value) || null}
            onChange={handleTicketTypeChange}
            placeholder="-- Select Ticket Type --"
            className="DisplayClickMePage-select"
            isDisabled={!selectedProject}
          />
        </div>

        {/* Custom Fields */}
        {customFields.map((field) => (
          <div className="DisplayClickMePage-field" key={field.fieldId}>
            <label>{field.name}:</label>
            {renderCustomField(field)}
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" className="DisplayClickMePage-submit">
          Create
        </button>
      </form>

      {/* Success Message */}
      {formSubmitted && (
        <div className="DisplayClickMePage-success">
          <p>
            Project: <strong>{selectedProject?.name}</strong>
          </p>
          <p>
            Ticket Type: <strong>{selectedTicketType?.label}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default DisplayClickMePage;
