import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { createNewUser } from '../call_service/server_call_methods'

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
            const result = await createNewUser(username, password);
            if (result.token) {
                login(result.username, result.token);
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
            console.error('Login failed:', error);
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