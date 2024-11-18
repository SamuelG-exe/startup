// Home.jsx
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../App'; 
import './Home.css'; //import here or in App.jsx

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
  return (
    <div className="search-section">
      <h1>make creativity collaborative</h1>
      <div className="discover-button">
        <Link to="/discover">
          <button>Discover</button>
        </Link>      
      </div>
      <div className="search-controls">
        <select>
          <option>Music</option>
          <option>Video</option>
          <option>Photography</option>
        </select>
        <select className="location-dropdown">
          <option value="">Select Location</option>
          <option value="salt-lake">Salt Lake</option>
          <option value="austin">Austin</option>
          <option value="los-angeles">Los Angeles</option>
        </select>
      
        <Link to="/discover">
          <FaSearch size={30} />
        </Link>
      </div>
    </div>
  );
}

function ProfileBox({ image, alt }) {
  return (
      <div className="profile-slideshow">
        <img src={image} alt={alt} />
        <div className="profile-info">
          <FaUser size={24} />
          <span>Profile</span>
        </div>
      </div>
  );
}

function FeaturedProfiles() {
  return (
    <div className="featured-section">
      <div className="featured-header">
        <p>Featured Profiles</p>
        <p>(grab off user's IP Address, pull content from queried most followed users in database)</p>
      </div>
      <div className="featured-users">
        <ProfileBox image="/makingmusic.jpg" alt="music" />
        <ProfileBox image="/photoshoot.png" alt="photo" />
        <ProfileBox image="/videography.jpg" alt="video" />
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