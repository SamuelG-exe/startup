import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { createNewUser } from '../call_service/server_call_methods'

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [contentType, setContentType] = useState('Music');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('The passwords do not match. Please try again!');
            setConfirmPassword('');
            return;
        }
        try {
            setError(''); // Clear any existing errors
            const result = await createNewUser(username, password, contentType);
            if (result.token) {
                login(result.username, result.token, result.contentType);
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
            console.error('Register failed:', error);
        }
    };

    return (
        <main className='container-fluid bg-secondary text-center'>
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                padding: '20px'
            }}>
                <h6>Provide the profile basics</h6>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{
                        margin: '5px',
                        width: '200px'
                    }}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{
                        margin: '5px',
                        width: '200px'
                    }}
                    required
                />
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    style={{
                        margin: '5px',
                        width: '200px'
                    }}
                    required
                />
                <h6>Select your type of content you'll be collaborating on!</h6>
                <select 
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                >
                    <option value="Music">Music</option>
                    <option value="Video">Video</option>
                    <option value="Photography">Photography</option>
                </select>
                <button 
                    type="submit"
                    style={{
                        margin: '5px',
                        width: '200px'
                    }}
                >
                    Create Account
                </button>
            </form>
            {error && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {error}
                </div>
            )}
        </main>
    );
}

export default Register;