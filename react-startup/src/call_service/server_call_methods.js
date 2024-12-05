// server_call_methods.js

export async function loginExistingUser(username, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Login failed');
        }

        if (!data.token || !data.username) {
            throw new Error('Invalid response from server');
        }

        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function createNewUser(username, password, contentType) {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, contentType })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.msg || 'Registration failed');
        }

        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

export async function logout(username) {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || 'Logout failed');
        }

        return data;
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}

export async function getContent(username) {
    try {
        console.log("Fetching content for user = ", username);
        const response = await fetch(`/api/auth/content/get?username=${encodeURIComponent(username)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.msg || 'Failed to fetch content');
        }

        return data; // Return the retrieved content
    } catch (error) {
        console.error('Content retrieval error:', error);
        throw error;
    }
}


export async function addContent(imageLink, authToken) {
    try {
        const response = await fetch('/api/auth/content/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ imageLink })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.msg || 'Failed to add content');
        }

        return data; 
    } catch (error) {
        console.error('Content addition error:', error);
        throw error;
    }
}

export async function getProfiles(contentType) {
    try {
        const response = await fetch(`/api/auth/discover/profiles?contentType=${encodeURIComponent(contentType)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Inform server about the content type
            },
        });

        // Parse the response to JSON
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || data.msg || 'Failed to fetch profiles');
        }

        if (!Array.isArray(data)) {
            throw new Error('Unexpected data format: expected an array of profiles.');
        }

        return data; // Return the profiles array
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Profile retrieval error:', error.message || error);

        // Re-throw the error to let the caller handle it
        throw error;
    }
}
