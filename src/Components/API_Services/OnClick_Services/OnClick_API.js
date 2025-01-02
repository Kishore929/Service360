const BASE_URL = 'http://localhost:5202/api/Ticket';

export const getProjectsWithTicketTypes_API = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetProjectsWithTicketTypes`);
    if (!response.ok) {
      throw new Error('Failed to fetch GetProjectsWithTicketTypes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching GetProjectsWithTicketTypes:', error);
    throw error;
  }
};

export const getCustomFieldsForCreateTicket_API = async (projectId, ticketTypeId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/GetCustomFieldsForCreateTicket?projectId=${projectId}&ticketTypeId=${ticketTypeId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch custom fields');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching custom fields:', error);
    throw error;
  }
};
