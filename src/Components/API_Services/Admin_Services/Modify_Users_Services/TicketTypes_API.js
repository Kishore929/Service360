const BASE_URL = 'http://localhost:5202/api/Admin';

export const getTicketTypes_API = async () => {
  const response = await fetch(`${BASE_URL}/GetTicketTypes`);
  if (!response.ok) {
    throw new Error('Failed to fetch ticket types');
  }
  return await response.json();
};

export const getTicketTypesForAssociation_API = async () => {
  const response = await fetch('http://localhost:5202/api/Association/GetTicketTypesForAssociation');
  if (!response.ok) {
    throw new Error('Failed to fetch ticket types');
  }
  return await response.json();
};

export const addTicketType_API = async (ticketType) => {
  try {
    const response = await fetch(`${BASE_URL}/AddTicketType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketType),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to add ticket type');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('API Error:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

export const updateTicketType_API = async (ticketType) => {
  try {
    const response = await fetch(`${BASE_URL}/UpdateTicketType`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticketType),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ticket type: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating ticket type:', error);
    throw error;
  }
};

export const deleteTicketType_API = async (ticketTypeId) => {
  try {
    const response = await fetch(`${BASE_URL}/DeleteTicketType?ticketTypeId=${ticketTypeId}`, {
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
