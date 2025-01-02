const BASE_URL = 'http://localhost:5202/api/Project';  // Centralized base URL

export const GetVersionsByProject_API = async (id) => {
    const response = await fetch(`${BASE_URL}/GetVersionsByProject?projectId=${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch project versions');
    }
    return await response.json();
};

export const AddVersion_API = async (option) => {
    try {
        const response = await fetch(`${BASE_URL}/AddVersion`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to add Version: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error adding Version:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const UpdateVersion_API = async (version) => {
    try {
        const response = await fetch(`${BASE_URL}/UpdateVersion`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(version),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to update Version: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error updating version:', error);
        throw error; // Re-throw the error for further handling
    }
}

export const DeleteVersion_API = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${BASE_URL}/DeleteVersion?versionId=${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete version: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting version:', error);
      throw error;
    }
};
