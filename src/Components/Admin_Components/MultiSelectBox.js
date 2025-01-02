import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MultiSelectBox = ({ values, selectedValues, initialProjects }) => {
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Initialize with previously selected projects
  useEffect(() => {
    if (initialProjects) {
      setSelectedProjects(initialProjects);
      selectedValues(initialProjects);
      console.log(initialProjects);
    }
  }, [initialProjects, selectedValues]);

  const styles = {
    container: {
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '10px',
      width: '250px',
      margin: '3px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'left',
    },
    projectList: {
      maxHeight: '200px',
      overflowY: 'auto',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '5px',
      margin: '0',
    },
    projectItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '5px 0',
    },
    checkbox: {
      width: '16px',
      height: '16px',
      margin: '0 0 0 10px',
    },
  };

  // Handle checkbox selection
  
  
  const handleCheckboxChange = (project) => {
    const updatedSelectedProjects = selectedProjects.some(p => p.value === project.value)
      ? selectedProjects.filter((p) => p.value !== project.value)
      : [...selectedProjects, project];

    setSelectedProjects(updatedSelectedProjects);
    selectedValues(updatedSelectedProjects);
  };

  return (
    <div style={styles.container}>
      <div style={styles.projectList}>
        {values.map((project) => (
          <label key={project.value} style={styles.projectItem}>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={selectedProjects.some(p => p.value === project.value)}
              onChange={() => handleCheckboxChange(project)}
            />
            {project.label}
          </label>
        ))}
      </div>
    </div>
  );
};

MultiSelectBox.propTypes = {
  values: PropTypes.array.isRequired,
  selectedValues: PropTypes.func.isRequired,
  initialSelectedProjects: PropTypes.array, // Array of previously selected values
};

MultiSelectBox.defaultProps = {
  initialSelectedProjects: [], // Default to empty array if no previous selection
};

export default MultiSelectBox;
