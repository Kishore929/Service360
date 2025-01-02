import React, { useEffect, useState } from 'react';
import { GetTicketTypesForAssociation_API, GetProjectsForAssociation_API } from '../../../api_index';
import { UpdateContext_API } from '../../../api_index';
import Select from 'react-select';
import { MultiSelectBox }from '../../../com_index';
import './CustomField.scss';

const UpdateConfigContext = ({ context, closePage, displayMessage }) => {


    const [name, setName] = useState(context ? context.name : '');
    const [description, setDescription] = useState(context ? context.description : '');
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchTicketTypesForAssociation = async () => {
            try {
                const response = await GetTicketTypesForAssociation_API();
                if (response.isSuccess) {
                    const ticketTypesForAssociation = response.result.map(type => ({
                        value: type.id,
                        label: type.name
                    }));
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
                    const projectsForAssociation = response.result.map(type => ({
                        value: type.id,
                        label: type.name
                    }));
                    setProjects(projectsForAssociation);
                }
            } catch (error) {
                console.error('Error fetching projects:', error.message);
            }
        };

        fetchProjectsForAssociation();
        fetchTicketTypesForAssociation();

        if (context) {
            setName(context.name);
            setDescription(context.description);

            // Set ticket types and projects, checking for null or empty array
            const allTicketTypes = context.ticketTypes?.map(type => ({
                value: type.id,
                label: type.name
            })) || [];

            const allProjects = context.projects?.map(project => ({
                value: project.id,
                label: project.name
            })) || [];

            setSelectedTicketTypes(allTicketTypes);
            setSelectedProjects(allProjects);
        }

    }, [context]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedContext = {
            contextId: context.id,
            customFieldId: context.customFieldId,
            name,
            description,
            ticketTypeIds: selectedTicketTypes.map(i => i.value),
            projectIds: selectedProjects.map(i => i.value)
        };

        console.log('Data being sent to API:', updatedContext);

        try {
            const response = await UpdateContext_API(updatedContext);
            console.log('API response:', response);
            setLoading(true);

            if (response.isSuccess === 1) {
                closePage();
                displayMessage(response.message);
            } else {
                displayMessage(response.errorMessage);
            }
        } catch (error) {
            console.error('Error updating:', error);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="header-row-selectFieldType">
                <h3>Edit Configuration Context for '{context.name}' Field</h3>
            </div>

            <form onSubmit={handleSubmit} className="field-config">

                <div style={{ marginBottom: '15px' }}>
                    <b><label><h6>Context Name:</h6></label></b>
                    <br />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <b><label><h6>Description:</h6></label></b>
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

                {/* <div style={{ marginBottom: '15px' }}>
                    <label><h6>Select Projects:</h6></label>
                    <Select
                        isMulti
                        options={projects}
                        value={selectedProjects}
                        onChange={setSelectedProjects}
                        className="multi-select"
                        placeholder="Select projects..."
                    />
                </div> */}

                <div style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                    <b><label style={{ marginTop: '5px' }}>Projects:</label></b>
                    <MultiSelectBox values={projects} selectedValues={setSelectedProjects} initialProjects={selectedProjects}/>
                </div>

                <div className="button-group">
                    <button type="submit" className="create-field-button" disabled={loading}>
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                    <button type="button" className="cancel-field-button" onClick={closePage}>
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    );
};

UpdateConfigContext.defaultProps = {
    onCancel: () => { },
    onSuccess: () => { },
};

export default UpdateConfigContext;
