// components/Profile/ProfileBox.jsx
import React from 'react';

const ProfileBox = ({ image, info }) => {
  return (
    <div className="profile-box">
      <div className="profile-slideshow">
        <img src={image} alt="Profile" />
      </div>
      <div className="profile-info">
        <i className="info-icon" />
        <span>{info}</span>
      </div>
    </div>
  );
};

export default ProfileBox;