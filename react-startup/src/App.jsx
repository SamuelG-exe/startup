import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './page_components/Home';
// import Discover from './page_components/Discover';
// import Profile from './page_components/Profile';
// import Messages from './page_components/Messages';
import { useEffect } from 'react';

function App() {
    const location = useLocation();

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
                document.title = 'Your App Name';
        }
    }, [location]);

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/discover" element={<Discover />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/messages" element={<Messages />} /> */}
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;