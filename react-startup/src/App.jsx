import { useState, useEffect, createContext, useContext } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './home/Home';
import Profile from './profile/Profile';
import Messages from './messages/Messages';
import Discover from './discover/pages/discover';
import Login from './login/login';

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

// Create AuthContext
const AuthContext = createContext(null);

// Create useAuth hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};


function App() {
    const location = useLocation();
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated on component mount
        const storedUserName = localStorage.getItem('userName');
        setIsAuthenticated(!!storedUserName);
    }, []);

    const login = (username) => {
        setUserName(username);
        setIsAuthenticated(true);
        localStorage.setItem('userName', username);
    };

    const logout = () => {
        setUserName('');
        setIsAuthenticated(false);
        localStorage.removeItem('userName');
    };

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Home';
                break;
            case '/discover':
                document.title = 'Discover';
                break;
            case '/profile':
                document.title = 'Profile';
                break;
            case '/messages':
                document.title = 'Messages';
                break;
            default:
                document.title = 'FreelConnect';
        }
    }, [location]);

    // Create auth context value
    const authValue = {
        isAuthenticated,
        userName,
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
                        <Route 
                            path="/profile" 
                            element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} 
                        />
                        <Route 
                            path="/messages" 
                            element={isAuthenticated ? <Messages /> : <Navigate to="/login" replace />} 
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