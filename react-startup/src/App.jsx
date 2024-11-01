import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import Home from './home/Home';
import Profile from './profile/Profile';
import Messages from './messages/Messages';
import Discover from './discover/pages/discover';

import { useEffect } from 'react';

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

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
                    <Route path="/discover" element={<Discover />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/messages" element={<Messages />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;