import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { loginExistingUser } from '../call_service/server_call_methods'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(''); // Clear any existing errors
            const result = await loginExistingUser(username, password);
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
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    style={{ margin: '5px' }}
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    style={{ margin: '5px' }}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && (
                    <div style={{ color: 'red', marginTop: '10px' }}>
                        {error}
                    </div>
            )}
        </main>
    );
}

export default Login;