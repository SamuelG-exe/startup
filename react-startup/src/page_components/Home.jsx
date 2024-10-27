// Home.jsx
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../css_components/Home.css';

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
        <button>Discover</button>
      </div>
      <div className="search-controls">
        <select>
          <option>Music</option>
          <option>Video</option>
          <option>Photography</option>
        </select>
        <input type="text" placeholder="Enter your city" />
        <Link to="/discover">
          <FaSearch size={30} />
        </Link>
      </div>
    </div>
  );
}

function ProfileBox({ image, alt }) {
  return (
    <div className="profile-box">
      <div className="profile-slideshow">
        <img src={image} alt={alt} />
        <div className="profile-info">
          <FaUser size={24} />
          <span>Profile</span>
        </div>
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
        <ProfileBox image="../../public/makingmusic.jpg" alt="music" />
        <ProfileBox image="../../public/photoshoot.png" alt="photo" />
        <ProfileBox image="../../public/videography.jpg" alt="video" />
      </div>
    </div>
  );
}

function CreateAccount() {
  return (
    <div className="make-account">
      <h1>find your people and share your creativity.</h1>
      <h2>create your account today</h2>
      <div className="create-button-container">
        <button>Create Your Account</button>
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
      <CreateAccount />
    </div>
  );
}

export default Home;