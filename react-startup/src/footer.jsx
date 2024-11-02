import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container>
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>Our GitHub Repo:  <a href="https://github.com/SamuelG-exe/startup.git">Click Here</a></p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/terms" className="text-light">Terms of Service</a></li>
              <li><a href="/privacy" className="text-light">Privacy Policy</a></li>
              <li><a href="/contact" className="text-light">Contact Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <div className="social-links">
              <a href="#" className="text-light me-3">Facebook</a>
              <a href="#" className="text-light me-3">Twitter</a>
              <a href="#" className="text-light">Instagram</a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;