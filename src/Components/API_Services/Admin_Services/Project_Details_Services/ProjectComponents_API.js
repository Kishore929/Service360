const BASE_URL = 'http://localhost:5202/api/Project';  // Centralized base URL

export const GetComponentsByProject_API = async (id) => {
    const response = await fetch(`${BASE_URL}/GetComponentsByProject?projectId=${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch project components');
    }
    return await response.json();
};

export const CreateComponent_API = async (component) => {
    try {
        const response = await fetch(`${BASE_URL}/CreateComponent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(component),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to add Custom Field: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error adding Custom Field:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const UpdateComponent_API = async (component) => {
    try {
        const response = await fetch(`${BASE_URL}/UpdateComponent`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(component),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to add Context: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error adding Context:', error);
        throw error; // Re-throw the error for further handling
    }
}

export const DeleteComponent_API = async (componentId) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteComponent`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to Delete Component: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting Component:', error);
      throw error;
    }
};