// Home.jsx
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; 
import { useState } from 'react';
import './Home.css'; 

function MusicVideo() {
  return (
    <div className="music-video">
      <video autoPlay loop>
        <source src="https://videos.pexels.com/video-files/5118415/5118415-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

function SearchSection() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = () => {
    navigate('/discover', { 
      state: { selectedCategory } 
    });
  };

  return (
    <div className="search-section">
      <h1>make creativity collaborative</h1>
      <div className="discover-button">
        <Link to="/discover">
          <button>Discover</button>
        </Link>      
      </div>
      <div className="search-controls">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Music">Music</option>
          <option value="Video">Video</option>
          <option value="Photography">Photography</option>
        </select>
        <div onClick={handleSearch}>
          <FaSearch size={30} />
        </div>
      </div>
    </div>
  );
}

function ProfileBox({ image, alt, profile, contentType }) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate(`/profile/${profile}`, { 
        state: { 
            username: profile,
            contentType: contentType,
            isViewOnly: true 
        }
    });
  };
  
  return (
      <div className="profile-slideshow"
      onClick={() => handleProfileClick(profile, contentType)}
      >
        <img src={image} alt={alt} />
        <div className="profile-info">
          <FaUser size={24} />
          <span>{profile}</span>
        </div>
      </div>
  );
}

function FeaturedProfiles() {
  return (
    <div className="featured-section">
      <div className="feature-header">
        <p>Featured Profiles</p>
        {/* <p>(grab off user's IP Address, pull content from queried most followed users in database)</p> */}
      </div>
      <div className="featured-users">
        <ProfileBox image="/makingmusic.jpg" alt="music" profile="mrMusic" contentType="Music" />
        <ProfileBox image="/photoshoot.png" alt="photo" profile="photoGal" contentType="Photography" />
        <ProfileBox image="/videography.jpg" alt="video" profile="mrVideo" contentType="Video" />
      </div>
    </div>
  );
}

function ViewAccount() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="make-account">
      <h1>find your people and share your creativity.</h1>
      <h2>all through a couple clicks</h2>
      <div className="create-button-container">
        <button onClick={handleClick}>
          {isAuthenticated ? 'View Your Profile' : 'View Your Account'}
        </button>
      </div>
    </div>
  );
}

function Home() {
  return (
    <div className="home-container">
      <MusicVideo />
      <SearchSection />
      <FeaturedProfiles />
      <ViewAccount />
    </div>
  );
}

export default Home;