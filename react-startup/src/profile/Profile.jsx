import { React, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Profile.css';
import '../App 2.css';
import ProfileCard from './components/ProfileCard';
import { useAuth } from '../App'; 
import { addContent, getContent } from '../call_service/server_call_methods';

const Profile = () => {
  const { username: currentUser, authToken, contentType: userContentType } = useAuth();
  const location = useLocation();
  const { username, contentType, isViewOnly } = location.state || {};
  
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [currProfileContent, setCurrProfileContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const profileUsername = isViewOnly ? username : currentUser;
        const data = await getContent(profileUsername);
        setCurrProfileContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (isViewOnly ? username : currentUser) {
      fetchContent();
    }
  }, [username, currentUser, isViewOnly]);

  const handleContentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted image link:', imageLink);
    console.log('Submitted with token:', authToken);
    await addContent(imageLink, authToken); 
    setCurrProfileContent([...currProfileContent, imageLink]);
    console.log("Current image links = ", currProfileContent);
    setImageLink('');
    setShowModal(false);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const displayUsername = isViewOnly ? username : currentUser;
  const displayContentType = isViewOnly ? contentType : userContentType;

  return (
    <>
      <ProfileCard 
      displayUsername={displayUsername}
      displayContentType={displayContentType}
    />

      <div className="featured-wrapper">
        <div className="featured-content">
          <div className="featured-header">
            <h2>Featured Content</h2>
            {!isViewOnly && (
              <button 
                className="btn btn-primary add-content-btn"
                onClick={() => setShowModal(true)}
              >
                Add Content
              </button>
            )}
          </div>
          <div className="content-box-container">
            {currProfileContent.map((content, index) => (
              <div key={index} className="content-box">
                <img src={content} alt={`Content ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ backgroundColor: 'lavender', borderRadius: '10px', padding: '10px' }}>
              Add New Image
            </h3>            
            <form onSubmit={handleContentSubmit}>
              <div className="form-group">
                <label htmlFor="imageLink"></label>
                <input
                  type="text"
                  id="imageLink"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="form-control"
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;