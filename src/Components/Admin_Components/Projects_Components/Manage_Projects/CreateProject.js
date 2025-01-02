import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { CreateProject_API, GetUsers_API, GetProjects_API } from '../../../api_index';

const CreateProject = ({ onCancel, onSuccess, displayMessage }) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [key, setKey] = useState('');
  const [lead, setLead] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [projects, setProjects] = useState([]);


  const fetchUsers = async () => {
    try {
      const response = await GetUsers_API();
      const usersForProject = [...new Set(response.result.map(project => ({ value: project.id, label: project.userName })))];
      setUsers(usersForProject || []);
      // showNotification(response.message);
    } catch (error) {
      console.error("Failed to fetch fields", error);
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await GetProjects_API();
      setProjects(data.result || []);
    } catch (err) {
      // setError(err.message);
      console.log(err.message)
    } finally {
      setLoading(false);
    }
  };

  // Fetch data whenever the current page changes
  useEffect(() => {
    fetchUsers();
    loadProjects();
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError('');
    const existName = projects.some(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );

    const existKey = projects.some(
      (p) => p.projectKey.toLowerCase() === key.toLowerCase()
    );

    if (existName) {
      setLoading(false);
      setErrorMessage('This project name already exists. Please choose a different name.');
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }

    if (existKey) {
      setLoading(false);
      setErrorMessage('This project key already exists. Please choose a different key.');
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer);
    }

    const newProject = {
      name,
      description,
      projectKey: key,
      projectLeadId: selectedUser.value,
    };

    console.log(newProject);

    try {
      const response = await CreateProject_API(newProject);
      if (response.isSuccess) {
        onSuccess();
        displayMessage(response.message);
        console.log(response.message);
      } else {
        setError(response.errorMessage || 'Failed to create project.');
      }
    } catch (error) {
      setError('Error creating project. Please try again.');
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="container">

      <div className="header-row-projects" >
        <h5>Create Project</h5>
      </div>

      {error && <div className="error-message">{error}</div>}
      {errorMessage && <div style={{ color: 'red', marginTop: '0px', marginBottom: '10px' }}>{errorMessage}</div>}

      <form onSubmit={handleSubmit} className='project-form'>

        <div style={{ marginBottom: '15px' }}>
          <b><label>Name:</label></b>
          <br></br>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <b><label>Key:</label></b>
          <br></br>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value.toUpperCase())}
            required
          />
        </div>

        <div style={{ marginBottom: '15px', width: '80%' }}>
          <label><h6>Select Lead:</h6></label>
          <Select
            options={users}
            onChange={setSelectedUser}
            placeholder="Select user..."
            isClearable
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <b><label>Description:</label></b>
          <br></br>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="button-group">
          <button type="submit" className="projects-btn" disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
          <button type="button" className="projects-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateProject;
