const BASE_URL = 'http://localhost:5202/api/Admin';  // Centralized base URL


export const GetCustomFieldTypes_API = async () => {
    const response = await fetch(`${BASE_URL}/GetCustomFieldTypes`);
    if (!response.ok) {
        throw new Error('Failed to fetch ticket types');
    }
    return await response.json();
};

export const GetCustomFields_API = async () => {
    const response = await fetch(`${BASE_URL}/GetCustomFields`);
    if (!response.ok) {
        throw new Error('Failed to fetch ticket types');
    }
    return await response.json();
};

export const AddCustomField_API = async (data) => {
    try {
        const response = await fetch(`${BASE_URL}/AddCustomField`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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

export const UpdateCustomField_API = async (customField) => {
    const response = await fetch(`${BASE_URL}/UpdateCustomField`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(customField),
    });

    if (!response.ok) {
        // Throw an error with response status and status text
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    return response.json();
};

/**
 * 
 * @deprecated we are remove this API after few days
 */
export const GetDefaultValueForContext_API = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/GetDefaultValueForContext?contextValueId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to fetch default context value: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error to fetch default context value:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const UpdateContext_API = async (contextField) => {
    const response = await fetch(`${BASE_URL}/UpdateContext`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contextField),
    });

    if (!response.ok) {
        // Throw an error with response status and status text
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    return response.json();
};

export const AddContext_API = async (context) => {
    try {
        const response = await fetch(`${BASE_URL}/AddContext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(context),
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
};

export const UpdateDefaultValueForContext_API = async (context) => {
    try {
        const response = await fetch(`${BASE_URL}/UpdateDefaultCustomValueForContext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(context),
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
};

export const CreateAddOptionInContext_API = async (option) => {
    try {
        const response = await fetch(`${BASE_URL}/CreateCustomValueWithInContext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(option),
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

export const UpdateOptionInContext_API = async (context) => {
    try {
        const response = await fetch(`${BASE_URL}/UpdateCustomValueInContext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(context),
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

export const EnableOrDisableOptionInContext_API = async (context) => {
    try {
        const response = await fetch(`${BASE_URL}/EnableOrDisableCustomValueInContext`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(context),
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

export const DeleteOptionInContext_API = async (context) => {
    try {
      const response = await fetch(`${BASE_URL}/DeleteCustomValueInContext`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(context),
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

export const SearchCustomFields_API = async (keyword) => {
    try {
        const response = await fetch(`${BASE_URL}/SearchCustomFields?searchKeyword=${keyword}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to fetch default context value: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error to fetch default context value:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const ArchiveCustomField_API = async (field) => {
    const response = await fetch(`${BASE_URL}/ArchiveCustomField`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(field),
    });

    if (!response.ok) {
        // Throw an error with response status and status text
        const errorResponse = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorResponse}`);
    }

    return response.json();
};

export const GetCustomFieldsByPageNumber_API = async (number) => {
    try {
        const response = await fetch(`${BASE_URL}/GetCustomFieldsByPageNumber`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(number)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to fetch default context value: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error to fetch default context value:', error);
        throw error; // Re-throw the error for further handling
    }
};