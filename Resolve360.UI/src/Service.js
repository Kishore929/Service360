const BASE_URL = 'http://localhost:5202/api/Admin';

// Generic function to fetch data from the API
export const fetchFromApi = async (endpoint) => {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

// Function to fetch ticket types
export const fetchTicketTypes = async () => {
  return await fetchFromApi('GetTicketTypes');
};

// Function to add a new ticket type
export const addIssues = async (newTicketType) => {
  const response = await fetch(`${BASE_URL}/AddTicketType`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTicketType),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};
