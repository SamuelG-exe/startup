import { Navbar, Container } from 'react-bootstrap';
import { FaHome, FaSearch, FaUser, FaEnvelope, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './App';


function Header() {
  const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
  };

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="brand-link">
          <img 
            src={"temp_logo.png"} 
            alt="Your Logo" 
            style={{ height: '60px', width: 'auto' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="nav-links-container ms-auto">
            <Link to="/" className="custom-nav-link">
              <FaHome /> Home
            </Link>
            <Link to="/discover" className="custom-nav-link">
              <FaSearch /> Discover
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="custom-nav-link">
                  <FaUser /> Profile
                </Link>
                <Link to="/messages" className="custom-nav-link">
                  <FaEnvelope /> Messages
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="custom-nav-link btn btn-link"
                  style={{ border: 'none', background: 'none', padding: 0 }}
                >
                  <FaSignInAlt /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="custom-nav-link">
                <FaSignInAlt /> Login
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;