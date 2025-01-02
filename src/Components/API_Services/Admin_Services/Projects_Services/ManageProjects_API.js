const BASE_URL = 'http://localhost:5202/api/Admin';  // Centralized base URL


export const GetProjects_API = async () => {
    const response = await fetch(`${BASE_URL}/GetProjects`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return await response.json();
};

export const GetUsers_API = async () => {
    const response = await fetch(`http://localhost:5202/api/Project/GetUsers`);
    if (!response.ok) {
        throw new Error('Failed to fetch projects');
    }
    return await response.json();
};

export const CreateProject_API = async (project) => {
    try {
        const response = await fetch(`${BASE_URL}/CreateProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to create project: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error creating project:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const UpdateProject_API = async (project) => {
    const response = await fetch(`${BASE_URL}/UpdateProject`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(project),
    });

    if (!response.ok) {
        // Throw an error with response status and status text
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    return response.json();
};

export const DeleteProject_API = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteProject?projectId=${id}`, {
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

