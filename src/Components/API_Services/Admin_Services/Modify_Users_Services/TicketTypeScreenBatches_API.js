export const getTicketTypeScreenBatches_API = async () => {
    const response = await fetch('http://localhost:5202/api/Admin/GetTicketTypeScreenBatches');
    if (!response.ok) {
      throw new Error('Failed to fetch ticket type screen batches');
    }
    return await response.json();
  };
  
  export const addTTScreenBatch_API = async (newBatch) => {
    const response = await fetch('http://localhost:5202/api/Admin/AddTicketTypeScreenBatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBatch),
    });
  
    if (!response.ok) {
      throw new Error('Failed to add Ticket Type Screen Batch');
    }
  
    return await response.json();
  };
  
  export const associateProjectToTicketTypeScreenBatch_API = async (associationData) => {
    const response = await fetch('http://localhost:5202/api/Admin/AssociateProjectToTicketTypeScreenBatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(associationData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to associate project to ticket type batch');
    }
  
    return await response.json();
  };
  
  export const GetProjectsForAssociation_API = async () => {
    const response = await fetch('http://localhost:5202/api/Association/GetProjectsForAssociation');
    if (!response.ok) {
      throw new Error('Failed to fetch ticket type screen batches');
    }
    return await response.json();
  };

  export const UpdateTicketTypeScreenBatch_API = async (updatedBatch) => {
    const response = await fetch('http://localhost:5202/api/Admin/UpdateTicketTypeScreenBatch', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBatch),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update Ticket Type Screen Batch');
    }
  
    return await response.json();
  };
  
  export const deleteTTScreenBatch_API = async (batchId) => {
    const response = await fetch(`http://localhost:5202/api/Admin/DeleteTicketTypeScreenBatch?ticketTypeScreenBatchId=${batchId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete Ticket Type Screen Batch');
    }

    return await response.json();
};
export const configureTTScreenBatch_API = async (screenBatchId) => {
  try {
    const response = await fetch(`http://localhost:5202/api/Admin/GetTicketTypeScreenBatchDetails?ticketTypeScreenBatchId=${screenBatchId}`, {
      method: 'GET', 
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || `Failed to fetch screen batch contents: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching screen batch contents:', error.message);
    throw error; 
  }
};


export const associateTicketTypeWithScreenBatch_API = async (payload) => {
    try {
      const response = await fetch('http://localhost:5202/api/Admin/AssociateTicketTypeWithScreenBatch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error('Failed to associate ticket type with screen batch');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error in associateTicketTypeWithScreenBatch_API:', error);
      throw error;
    }
  };
  
  export const EditTicketTypeScreenBatchEntry_API  = async (updatedBatch) => {
    const response = await fetch('http://localhost:5202/api/Admin/EditTicketTypeScreenBatchEntry', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBatch),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update Ticket Type Screen Batch');
    }
  
    return await response.json();
  };

  export const deleteTicketTypeScreenBatchEntry_API = async (id) => {
    try {
        const response = await fetch(`http://localhost:5202/api/Admin/DeleteTicketTypeScreenBatchEntry?ticketTypeScreenBatchEntryId=${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data; // Assuming the API returns an 'isSuccess' field
    } catch (error) {
        console.error('Error deleting the entry:', error);
        throw error;
    }
};
