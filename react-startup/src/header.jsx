import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { FaHome, FaSearch, FaUser, FaEnvelope } from 'react-icons/fa';

function Header() {
  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container className="navbar-container">
        <Navbar.Brand as={Link} to="/" className="brand-link">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="nav-links-container ms-auto">
            <Link to="/" className="custom-nav-link"><FaHome /> Home</Link>
            <Link to="/discover" className="custom-nav-link"><FaSearch /> Discover</Link>
            <Link to="/profile" className="custom-nav-link"><FaUser /> Profile</Link>
            <Link to="/messages" className="custom-nav-link"><FaEnvelope /> Messages</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;