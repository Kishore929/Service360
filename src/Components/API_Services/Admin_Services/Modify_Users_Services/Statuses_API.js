const BASE_URL = 'http://localhost:5202/api/Admin';

export const getStatus_API = async () => {
  const response = await fetch(`${BASE_URL}/GetStatuses`);
  if (!response.ok) {
    throw new Error('Failed to fetch ticket types');
  }
  return await response.json();
};

export const getStatusCategories_API = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetStatusCategories`);
    if (!response.ok) {
      throw new Error('Failed to fetch status categories');
    }
    const data = await response.json();
    console.log('Fetched Categories Data:', data); // Log fetched data to verify structure
    return { isSuccess: true, result: data }; // Ensure data is returned in the expected format
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { isSuccess: false, message: error.message };
  }
};

export const addStatus_API = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/AddStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
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
  
  export const updateStatus_API = async (status) => {
    try {
      const response = await fetch(`${BASE_URL}/UpdateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(status),
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
  
  export const deleteStatus_API = async (statusId) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteStatus?StatusId=${statusId}`, {
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