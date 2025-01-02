const BASE_URL = 'http://localhost:5202/api/Admin';

export const getResolution_API = async () => {
  const response = await fetch(`${BASE_URL}/GetResolutions`);
  if (!response.ok) {
    throw new Error('Failed to fetch ticket types');
  }
  return await response.json();
};

export const addResolution_API = async (resolution) => {
    try {
      const response = await fetch(`${BASE_URL}/AddResolution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resolution),
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
  
  export const updateResolution_API = async (resolution) => {
    try {
      const response = await fetch(`${BASE_URL}/UpdateResolution`, {
        method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resolution), // Passing the full object here
    });

    // Checking if the response is successful
    if (!response.ok) {
      throw new Error('Failed to edit resolution');
    }

    // Parse response JSON if successful
    const data = await response.json();
    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error editing resolution:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

  
  export const deleteResolution_API = async (resolutionId) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteResolution?resolutionId=${resolutionId}`, {
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