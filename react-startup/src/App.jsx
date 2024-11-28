import { useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './home/Home';
import Profile from './profile/Profile';
import Messages from './messages/Messages';
import Discover from './discover/pages/discover';
import Login from './login/login';
import Register from './login/register';
import { logout as logoutService } from './call_service/server_call_methods';

// NotFound component can be defined here or imported
function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

function App() {
    const [authToken, setAuthToken] = useState(null);
    const [username, setUserName] = useState('');
    const [contentType, setContentType] = useState(null);

    const login = (username, token, contentType) => {
        setAuthToken(token);
        setUserName(username);
        setContentType(contentType);
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
    };

    const logout = async () => {
        try {
            // Call backend logout
            await logoutService(username);
            // Clear state
            setAuthToken(null);
            setUserName('');
            setContentType(null);
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const authValue = {
        isAuthenticated: !!authToken,
        username,
        contentType,
        authToken: authToken,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={authValue}>
            <div className="d-flex flex-column min-vh-100">
                <Header />
                <main className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/discover" element={<Discover />} />
                        <Route 
                            path="/login" 
                            element={<Login />} 
                        />
                        <Route path="/register" element={<Register />}/>
                        <Route 
                            path="/profile" 
                            element={authToken ? <Profile /> : <Navigate to="/login" replace />} 
                        />
                        <Route 
                            path="/messages" 
                            element={authToken ? <Messages /> : <Navigate to="/login" replace />} 
                        />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;