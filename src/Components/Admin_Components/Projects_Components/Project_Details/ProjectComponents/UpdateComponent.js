import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { UpdateProject_API, GetUsers_API, GetProjects_API } from '../../../api_index';


const UpdateProject = ({ project, onCancel, onSuccess, displayMessage }) => {

    const [name, setName] = useState(project ? project.name : '');
    const [key, setKey] = useState(project ? project.projectKey : '');
    const [selectedUser, setSelectedUser] = useState([]);
    const [description, setDescription] = useState(project ? project.description : '');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [projects, setProjects] = useState([]);


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

    useEffect(() => {
        if (project) {
            setName(project.name || '');
            setKey(project.projectKey || '');
            setDescription(project.description || '');
            setSelectedUser(
                project.projectLead
                    ? { value: project.projectLead.id, label: project.projectLead.userName }
                    : null
            );
        }
        loadProjects();
    }, [project]);

    const fetchUsers = async () => {
        try {
            const response = await GetUsers_API();
            const usersForProject = [...new Set(response.result.map(project => ({ value: project.id, label: project.userName })))];
            setUsers(usersForProject || []);
        } catch (error) {
            console.error("Failed to fetch fields", error);
        }
    };

    // Fetch data whenever the current page changes
    useEffect(() => {
        fetchUsers();
    }, []);


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        const existName = projects.some(
            (p) => p.name.toLowerCase() === name.toLowerCase() && p.id !== project.id
        );

        const existKey = projects.some(
            (p) => p.projectKey.toLowerCase() === key.toLowerCase() && p.id !== project.id
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

        const updatedProject = {
            id: project.id,
            name,
            description,
            projectKey: key,
            projectLeadId: selectedUser.value,
        };

        console.log('Data being sent to API:', updatedProject);

        try {
            const response = await UpdateProject_API(updatedProject);
            console.log('API response:', response);

            if (response.isSuccess === 1) {
                onSuccess(); // Call the onSuccess callback to refresh data
                displayMessage(response.message);
                console.log('Success message:', response.message);
            } else {
                onCancel()
                displayMessage(response.message);
                console.log('Error message:', response.message);
            }
        } catch (error) {
            console.error('Error updating Project:', error);
            displayMessage('Failed to Update Project. Please try again.');
        } finally {
            setLoading(false); // Ensure loading state is reset
        }

    };

    return (
        <div className='container'>

            <div className="header-row-selectFieldType">
                <h3>Update '{project.name}' Project</h3>
            </div>

            {errorMessage && <div style={{ color: 'red', marginTop: '0px', marginBottom: '10px' }}>{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="project-form">

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Project Name:</label></b>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Key:</label></b>
                    <br />
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
                        value={selectedUser}
                        onChange={setSelectedUser}
                        placeholder="Select user..."
                        isClearable
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Description:</label></b>
                    <br />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="button-group">
                    <button type="submit" className="create-field-button" disabled={loading}>
                        {loading ? 'Updateing...' : 'Update'}
                    </button>

                    <button type="button" className="cancel-field-button" onClick={onCancel}>
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    );
};

UpdateProject.defaultProps = {
    onCancel: () => { }, // Default to a no-op function
    onSuccess: () => { }, // Default to a no-op function
};

export default UpdateProject;