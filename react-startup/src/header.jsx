import { Link } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import { FaHome, FaSearch, FaUser, FaEnvelope } from 'react-icons/fa';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ms-auto">
            <Link to="/" className="btn btn-link"><FaHome /> Home</Link>
            <Link to="/discover" className="btn btn-link"><FaSearch /> Discover</Link>
            <Link to="/profile" className="btn btn-link"><FaUser /> Profile</Link>
            <Link to="/messages" className="btn btn-link"><FaEnvelope /> Messages</Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;