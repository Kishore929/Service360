import React, { useEffect, useState } from "react";
import { GetProjectsForAssociation_API, associateProjectToTicketTypeBatch_API } from '../../../api_index';
import Select from "react-select";
import './TicketTypeBatches.scss';

const AssociateTicketTypeBatch = ({ onCancel, onSuccess, scheme, displayMessage }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

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

        if (scheme) {
            setSelectedProjects(scheme.projects.map(type => ({
                value: type.id,
                label: type.name,
            })));
        }

    }, [scheme]);

    const handleProjectChange = (selectedOptions) => {
        setSelectedProjects(selectedOptions || []);
    };

    const handleAssociate = async () => {
        setLoading(true);
        console.log(selectedProjects);
        const associatedProjectIds = selectedProjects.map(item => item.value);

        const associateBatchIds = scheme.id

        const updatedScheme = {
            projectId: associatedProjectIds.map(id => id),
            ticketTypeBatchId: associateBatchIds
        };

        console.log('Data being sent to API:', updatedScheme);

        try {
            const response = await associateProjectToTicketTypeBatch_API(updatedScheme);
            console.log('API response:', response);

            if (response.isSuccess === 1) {
                displayMessage(response.message);
                onSuccess();
            } else {
                displayMessage("Failed to associate projects and ticket types. Please try again.");
            }
        } catch (error) {
            console.error("Error associating projects and ticket types:", error);
            alert("Failed to associate projects and ticket types. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
      <div className="TT_Batches-header-row-tickettypebatch" style={{ marginTop: '19px' }}>
      <h5>Associate Projects to Batch</h5></div>
            <div className="TT_Batches-underline">
                <h6 className="TT_Batches-associate-title">Associate Projects</h6>
            </div>
            {scheme && (
                <div>
                    <div>Scheme Name: {scheme.name}</div>
                    <div>Description: {scheme.description}</div>
                </div>
            )}
            <br />
            <h6>Select Projects to Associate:</h6>
            <Select
                isMulti
                options={projects}
                value={selectedProjects}
                onChange={handleProjectChange}
                className="basic-multi-select"
                classNamePrefix="select"
                placeholder="Select projects..."
            />

            <div style={{ marginTop: '20px' }}>
                <button className="button TT_Batches-add-button" onClick={handleAssociate} disabled={loading}>
                    {loading ? 'Associating...' : 'Done'}
                </button>
                <button className="cancel TT_Batches-cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
};

AssociateTicketTypeBatch.defaultProps = {
    onCancel: () => { },
    onSuccess: () => { },
    displayMessage: () => { },
};

export default AssociateTicketTypeBatch;