const BASE_URL = 'http://localhost:5202/api/Auth';  // Centralized base URL http://localhost:5202/api/Auth//RegisterUser

export const LoginUser_API = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/LoginUser`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to Login: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error occured while login:', error);
        throw error; // Re-throw the error for further handling
    }
};

export const RegisterUser_API = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/RegisterUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Read response text for details
            throw new Error(`Failed to Register: ${response.status} - ${errorText}`);
        }

        return await response.json(); // Return the newly created data
    } catch (error) {
        console.error('Error occured while Register:', error);
        throw error; // Re-throw the error for further handling
    }
};

