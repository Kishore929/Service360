import React, { useState, useEffect } from 'react';
import { MultiSelectBox } from '../../../com_index';
import Select from 'react-select';
import { GetTicketTypesForAssociation_API, GetProjectsForAssociation_API } from '../../../api_index';
import './CustomField.scss';
import { AddContext_API } from '../../../api_index';

const AddConfigContext = ({ closePage, field, displayMessage }) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false); // Loading should start as false



    useEffect(() => {

        const fetchTicketTypesForAssociation = async () => {
            try {
                const response = await GetTicketTypesForAssociation_API();
                if (response.isSuccess) {
                    const ticketTypesForAssociation = [...new Set(response.result.map(type => ({ value: type.id, label: type.name })))];
                    setTicketTypes(ticketTypesForAssociation);
                }
            } catch (error) {
                console.error('Error fetching ticket types:', error.message);
            }
        };

        const fetchProjectsForAssociation = async () => {
            try {
                const response = await GetProjectsForAssociation_API();

                if (response.isSuccess) {
                    const projectsForAssociation = [...new Set(response.result.map(type => ({ value: type.id, label: type.name })))];
                    console.log(projectsForAssociation);
                    setProjects(projectsForAssociation);

                }
            } catch (error) {
                console.error('Error fetching ticket types:', error.message);
            }
        };

        fetchProjectsForAssociation();
        fetchTicketTypesForAssociation();

    }, [field]);

    let formdata = {
        name: name,
        description: description,
        customFieldId: field.customFieldId,
        projects: selectedProjects.map(project => ({ id: project.value })),
        ticketTypes: selectedTicketTypes.map(ticketType => ({ id: ticketType.value })),
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        console.log(formdata)

        try {
            const response = await AddContext_API(formdata);
            console.log('API response:', response.result);
      
            if (response.isSuccess === 1) {
                closePage();
              displayMessage(response.message);
              console.log('Success message:', response.message);
            } else {
              displayMessage(response.errorMessage);
              console.log('Error message:', response.errorMessage);
            }
          } catch (error) {
            console.error('Error updating ticket type:', error);
          } finally {
            setLoading(false);
          }

    };

    return (
        <div className="add-config-context">

            <div className="header-row-selectFieldType">
                <h3>Add Configuration Context for '{field.name}' Field</h3>
            </div>

            <form onSubmit={handleSubmit} className="field-config">

                <div style={{ marginBottom: '15px' }}>
                    <b><label>Name:</label></b>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
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

                <div style={{ marginBottom: '15px' }}>
                    <label><h6>Select Ticket Types:</h6></label>
                    <Select
                        isMulti
                        options={ticketTypes}
                        value={selectedTicketTypes}
                        onChange={setSelectedTicketTypes}
                        className="multi-select"
                        placeholder="Select ticket types..."
                    />

                </div>

                <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                    <b><label style={{ marginTop: '5px' }}>Projects:</label></b>
                    <MultiSelectBox values={projects} selectedValues={setSelectedProjects} />
                </div>

                <div className="button-group">
                    <button type="submit" className="create-field-button" disabled={loading}>
                        {loading ? 'Adding...' : 'Add'}
                    </button>

                    <button type="button" className="cancel-field-button" onClick={closePage}>
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddConfigContext;
