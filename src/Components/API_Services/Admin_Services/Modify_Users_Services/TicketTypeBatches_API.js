const BASE_URL = 'http://localhost:5202/api/Admin';

export const fetchFromApi = async (endpoint) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`);
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

export const getTicketTypeBatches_API = async () => {
    return await fetchFromApi('GetTicketTypeBatches');
};

export const updateTicketTypeBatch_API = async (ticketType) => {
    const response = await fetch('http://localhost:5202/api/Admin/UpdateTicketTypeBatch', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ticketType),
    });

    if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    return response.json();
};

export const AddTicketTypeBatch_API = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/AddTicketTypeBatch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to add ticket type scheme: ${response.status} - ${errorText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error adding ticket type scheme:', error);
        throw error; 
    }
};

export const DeleteTicketTypeBatch_API = async (ticketTypeId) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteTicketTypeBatch?ticketTypeBatchId=${ticketTypeId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete ticket type: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting ticket type:', error);
      throw error;
    }
};

export const GetTicketTypesForAssociation_API = async () => {
    try {
        const response = await fetch(`http://localhost:5202/api/Association/GetTicketTypesForAssociation`);
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }
        return await response.json(); 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

export const GetProjectsForAssociation_API = async () => {
    try {
        const response = await fetch(`http://localhost:5202/api/Association/GetProjectsForAssociation`);
        
        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; 
    }
};

export const associateProjectToTicketTypeBatch_API = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/AssociateProjectToTicketTypeBatch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text(); 
            throw new Error(`Failed to add ticket type scheme: ${response.status} - ${errorText}`);
        }

        return await response.json(); 
    } catch (error) {
        console.error('Error adding ticket type scheme:', error);
        throw error; 
    }
};
