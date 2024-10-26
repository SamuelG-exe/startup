import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaHome, FaSearch, FaUser, FaEnvelope } from 'react-icons/fa';

function Header() {
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">Your Logo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/"><FaHome /> Home</Nav.Link>
            <Nav.Link href="/discover"><FaSearch /> Discover</Nav.Link>
            <Nav.Link href="/profile"><FaUser /> Profile</Nav.Link>
            <Nav.Link href="/messages"><FaEnvelope /> Messages</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;