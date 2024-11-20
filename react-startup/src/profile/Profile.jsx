import React from 'react';
import './Profile.css';
import '../App 2.css';
import Reviews from './components/Reviews';
import { useAuth } from '../App'; // Adjust the import path based on your file structure


const Profile = () => {
  const { username } = useAuth();
  const { contentType } = useAuth();


  return (
    <>
    <div>
  <div className="profile-container">
      <div className="image-box">
      <div className="username">{username || 'Username'}</div>
        <img src="https://via.placeholder.com/150" alt="Profile" />
        <div className="content-genre" >Content Type: {contentType || 'testing'}</div>
        <Reviews />
      </div>

      
      <div className="description-box">
        <div className="about-box">
          About section content
        </div>
        <div className="contact-details">
          <div className="contact-item">Contact 1</div>
          <div className="contact-item">Contact 2</div>
          <div className="contact-item">Contact 3</div>
        </div>
      </div>
      
      <div className="events-attending">
        Events section
      </div>
    </div>
  </div>

  <div className="featured-wrapper">
    <div className="featured-content">
      <h2>Featured Content</h2>
      <div className="content-box-container">
        <div className="content-box">Content 1</div>
        <div className="content-box">Content 2</div>
        <div className="content-box">Content 3</div>
      </div>
    </div>
  </div>
</>
  );
};

export default Profile;