const BASE_URL = 'http://localhost:5202/api/Admin';

// Fetch list of priorities
export const getScreens_API = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetScreens`);
    if (!response.ok) {
      throw new Error('Failed to fetch Screens');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Screens:', error);
    throw error;
  }
};

export const addScreen_API = async (screen) => {
  try {
    const response = await fetch(`${BASE_URL}/AddScreen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screen),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to add screen');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('API Error:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

export const getScreenContents_API = async (screenId) => {
  try {
    const response = await fetch(`${BASE_URL}/GetScreenContents?screenId=${screenId}`, {
      method: 'GET', 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch screen batch contents: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching screen batch contents:', error);
    throw error; 
  }
};

export const updateScreenContent_API = async (screenId, customFieldId, sequenceNumber) => {
  try {
    // Construct the URL with query parameters
    const url = `${BASE_URL}/UpdateScreenContent?screenId=${screenId}&customFieldId=${customFieldId}&sequenceNumber=${sequenceNumber}`;
    
    // Use PUT method
    const response = await fetch(url, {
      method: 'PUT', // Change to PUT method
      headers: {
        'Content-Type': 'application/json', // Ensure headers are correct
      },
    });

    // Parse the response JSON
    const data = await response.json();

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to update screen content');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error updating screen content:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

