const BASE_URL = 'http://localhost:5202/api/Admin';

// Fetch list of priorities (Screen Batches)
export const getScreenBatches_API = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetScreenBatches`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errorMessage || 'Failed to fetch Screens');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Screens:', error.message);
    throw error;
  }
};

// Add new screen batch
export const addScreenBatch_API = async (screenBatch) => {
  try {
    const response = await fetch(`${BASE_URL}/AddScreenBatch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenBatch),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to add screen batch');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error adding screen batch:', error.message);
    return { isSuccess: false, errorMessage: error.message };
  }
};

// Fetch screen batch contents
export const getScreenBatchContents_API = async (screenBatchId) => {
  try {
    const response = await fetch(`${BASE_URL}/GetScreenBatchContents?screenBatchId=${screenBatchId}`, {
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

// Update screen batch
// Assuming BASE_URL is defined elsewhere in your code.
export const updateScreenBatch_API = async (screenBatch) => {
  try {
    const response = await fetch(`${BASE_URL}/UpdateScreenBatch`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(screenBatch),
    });

    // Log the raw response body for debugging
    const text = await response.text();
    console.log('Raw response:', text);

    let data;
    try {
      data = JSON.parse(text); // Try parsing as JSON
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return { isSuccess: false, errorMessage: 'Server returned invalid JSON.' };
    }

    if (!response.ok) {
      throw new Error(data.errorMessage || `Failed to update screen batch: ${response.status} ${response.statusText}`);
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error updating screen batch:', error.message);
    return { isSuccess: false, errorMessage: error.message };
  }
};

