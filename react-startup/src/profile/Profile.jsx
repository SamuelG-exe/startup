import { React, useState, useEffect } from 'react';
import './Profile.css';
import '../App 2.css';
import Reviews from './components/Reviews';
import { useAuth } from '../App'; 
import { addContent, getContent } from '../call_service/server_call_methods';

const Profile = () => {
  const { username, authToken, contentType } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [imageLink, setImageLink] = useState('');
  const [currProfileContent, setCurrProfileContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await getContent(username);
        setCurrProfileContent(data);
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (username) {
      fetchContent();
    }
  }, [username]);

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

  return (
    <>
      <div>
        <div className="profile-container">
          <div className="image-box">
            <div className="username">{username || 'Username'}</div>
            <img src="https://via.placeholder.com/150" alt="Profile" />
            <div className="content-genre">Content Type: {contentType || 'testing'}</div>
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
          <div className="featured-header">
            <h2>Featured Content</h2>
            <button 
              className="btn btn-primary add-content-btn"
              onClick={() => setShowModal(true)}
            >
              Add Content
            </button>
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