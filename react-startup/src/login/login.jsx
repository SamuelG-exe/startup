import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { loginExistingUser, createNewUser, logout } from '../call_service/server_call_methods'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await loginExistingUser(username, password);
            if (result.token) {
                login(result.username, result.token);
                navigate('/');
            }
        } catch (error) {
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
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default Login;