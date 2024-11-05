import React from 'react';

const ProfileInfo = ({ user }) => {
  return (
    <div className="image-box">
      <img src={user.image} alt={user.username} />
      <h2 className="username">{user.username}</h2>
      <div className="about-box">
        <p>{user.about}</p>
      </div>
      <div className="contact-details">
        <div className="contact-item">{user.email}</div>
        <div className="contact-item">{user.website}</div>
        <div className="contact-item">Message</div>
      </div>
    </div>
  );
};

export default ProfileInfo;