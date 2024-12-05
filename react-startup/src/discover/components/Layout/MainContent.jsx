// components/Layout/MainContent.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfiles } from '../../../call_service/server_call_methods';
import { useAuth } from '../../../App'; 


const MainContent = ({ selectedCategory, setSelectedCategory }) => {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();
  const { username } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      if (selectedCategory) {
        try {
          const profilesData = await getProfiles(selectedCategory);
          const filteredProfiles = profilesData.filter(
            profile => profile.username !== username
          );
          setProfiles(filteredProfiles || []);
        } catch (error) {
          console.error('Error fetching profiles:', error);
          setProfiles([]);
        }
      }
    };
  
    fetchProfiles();
  }, [selectedCategory, username]);

  const handleProfileClick = (profile) => {
    navigate(`/profile/${profile.username}`, { 
        state: { 
            username: profile.username,
            contentType: profile.contentType,
            isViewOnly: true 
        }
    });
};

  return (
    <div className="Discover-main-content">
      <div className="Discover-search">
        {['Photography', 'Music', 'Video'].map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="Discover-grid">
        {profiles.map((profile) => (
          <div 
            key={profile._id} 
            className="Discover-box-container"
            onClick={() => handleProfileClick(profile)}
          >
            <div className="profile-box">
              <div className="profile-slideshow">
                <img 
                  src="placeholder.jpg"
                  alt={profile.username} 
                />
              </div>
              <div className="profile-info">
                <i className="info-icon" />
                <span>{profile.username}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;