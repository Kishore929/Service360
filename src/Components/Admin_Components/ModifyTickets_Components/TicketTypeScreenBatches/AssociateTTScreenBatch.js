import React, { useEffect, useState } from "react";
import { GetProjectsForAssociation_API, associateProjectToTicketTypeScreenBatch_API } from '../../../api_index';
import Select from "react-select";
import './TTScreenBatches.scss';

const AssociateTTScreenBatch = ({ onCancel, onSuccess, batch, displayMessage }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProjectsForAssociation = async () => {
            try {
                const response = await GetProjectsForAssociation_API();

                if (response.isSuccess) {
                    const uniqueProjects = response.result.reduce((acc, current) => {
                        const existingProject = acc.find(project => project.id === current.id);
                        if (!existingProject) {
                            acc.push({
                                value: current.id,
                                label: current.name
                            });
                        }
                        return acc;
                    }, []);

                    console.log(uniqueProjects); 
                    setProjects(uniqueProjects);
                }
            } catch (error) {
                console.error('Error fetching projects for association:', error.message);
            }
        };

        fetchProjectsForAssociation();

        if (batch) {
            setSelectedProjects(batch.projects.map(type => ({
                value: type.id,
                label: type.name,
            })));
        }
    }, [batch]);

    const handleProjectChange = (selectedOptions) => {
        setSelectedProjects(selectedOptions || []);
    };

    const handleAssociate = async () => {
        setLoading(true);
        console.log(selectedProjects);
        const associatedProjectIds = selectedProjects.map(item => item.value);

        const updatedBatch = {
            projectIds: associatedProjectIds,
            ticketTypeScreenBatchId: batch.id
        };

        console.log('Data being sent to API:', updatedBatch);

        try {
            const response = await associateProjectToTicketTypeScreenBatch_API(updatedBatch);
            console.log('API response:', response);

            if (response.isSuccess === 1) {
                displayMessage(response.message);
                onSuccess();
            } else {
                displayMessage("Failed to associate projects and screen batches. Please try again.");
            }
        } catch (error) {
            console.error("Error associating projects and screen batches:", error);
            alert("Failed to associate projects and screen batches. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="TTScreenBatches-header-row" style={{ marginTop: '19px' }}>
                <h5>Associate Projects to Screen Batch</h5>
            </div>
            <div className="TTScreenBatches-underline">
                <h6 className="TTScreenBatches-associate-title">Associate Projects</h6>
            </div>
            {batch && (
                <div>
                    <div>Batch Name: {batch.name}</div>
                    <div>Description: {batch.description}</div>
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
                <button className="button TTScreenBatches-add-button" onClick={handleAssociate} disabled={loading}>
                    {loading ? 'Associating...' : 'Done'}
                </button>
                <button className="cancel TTScreenBatches-cancel-button" onClick={onCancel}>Cancel</button>
            </div>
        </>
    );
};

AssociateTTScreenBatch.defaultProps = {
    onCancel: () => { },
    onSuccess: () => { },
    displayMessage: () => { },
};

export default AssociateTTScreenBatch;
