

export function loginExistingUser(username, password) {
    console.log("Login button pressed!");
    return fetch('/api/auth/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
    .then((response) => response.json())
    .catch(error => console.error('Login error:', error));
}

// Add other methods with named exports
export function createNewUser(username, password) {
    console.log("Create user button pressed!");
    return fetch('/api/auth/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: username,
            password: password
        })
    })
    .then((response) => response.json())
    .catch(error => console.error('Create user error:', error));
}

// You can add more methods following the same pattern
export function logout() {
    console.log("Logout pressed!");
    // Add logout logic
}