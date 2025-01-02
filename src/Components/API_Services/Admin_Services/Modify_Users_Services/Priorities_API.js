const BASE_URL = 'http://localhost:5202/api/Admin';

// Fetch list of priorities
export const getPriorities_API = async () => {
  try {
    const response = await fetch(`${BASE_URL}/GetPriorities`);
    if (!response.ok) {
      throw new Error('Failed to fetch priorities');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching priorities:', error);
    throw error;
  }
};

// Add a new priority
export const addPriority_API = async (priority) => {
  try {
    const response = await fetch(`${BASE_URL}/AddPriority`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(priority),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to add priority');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error adding priority:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

// Update an existing priority
export const updatePriority_API = async (priority) => {
  try {
    const response = await fetch(`${BASE_URL}/UpdatePriority`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(priority),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to update priority');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error updating priority:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};

// Delete a priority by ID
export const deletePriority_API = async (priorityId) => {
  try {
    const response = await fetch(`${BASE_URL}/DeletePriority?priorityId=${priorityId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errorMessage || 'Failed to delete priority');
    }

    return { isSuccess: true, result: data };
  } catch (error) {
    console.error('Error deleting priority:', error);
    return { isSuccess: false, errorMessage: error.message };
  }
};
