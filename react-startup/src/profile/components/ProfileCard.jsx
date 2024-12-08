import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reviews from './Reviews';
import '../Profile.css';
import { useAuth } from '../../App'; 

const ProfileCard = ({ displayUsername, displayContentType, isViewOnly, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [aboutText, setAboutText] = useState('');
  const navigate = useNavigate(); // React Router hook for navigation

  const { username } = useAuth(); // Get the logged-in user's username

  const handleSave = () => {
    setIsEditing(false);
    if (onEdit) {
      onEdit({ imageUrl, aboutText });
    }
  };

  const navigateToMessages = () => {
    navigate('/messages');
  };

  return (
    <div>
      <div className="profile-container">
        <div className="image-box">
          <div className="username">
            {displayUsername || 'Username'}
          </div>
          <img src={imageUrl || "https://via.placeholder.com/150"} alt="Profile" />
          <div className="content-genre">
            Content Type: {displayContentType || 'testing'}
          </div>
          <Reviews />
        </div>

        <div className="description-box">
          {isEditing ? (
            <div>
              <div className="form-group">
                <label htmlFor="imageUrl">Profile Image URL</label>
                <input
                  type="text"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
              <div className="form-group">
                <label htmlFor="aboutText">About</label>
                <textarea
                  id="aboutText"
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  placeholder="Enter about text"
                />
              </div>
              <button onClick={handleSave} className="btn btn-primary">Save</button>
              <button onClick={() => setIsEditing(false)} className="btn btn-secondary">Cancel</button>
            </div>
          ) : (
            <div className="about-box">
              {aboutText || "About section content"}
            </div>
          )}

          {/* Conditionally render the Edit Profile button */}
          {!isViewOnly && !isEditing && displayUsername === username && (
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit Profile
            </button>
          )}

          <div className="contact-details">
            <button className="btn contact-item">Email</button>
            <button className="btn contact-item">Phone</button>
            <button className="btn contact-item" onClick={navigateToMessages}>
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;