import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        
        <div className="footer-section">
          <h4 className="footer-brand">Cat Lover</h4>
          <p className="footer-description">
            Providing high-quality products for your beloved cats.
          </p>
        </div>

        <div className="footer-section">
          <h5>Customer Care</h5>
          <ul>
            <li><Link to="/">Help & FAQ</Link></li>
            <li><Link to="/">Shipping & Returns</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Legal</h5>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Shohei Kotera. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;