import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import Container from './common/Container';
import { ROUTES } from '../constants/routes';

const Footer = () => {
  return (
    <footer className="footer">
      <Container className="footer-container">
        <div className="footer-section about">
          <h3 className="footer-logo">RikaburgerNG</h3>
          <p>The best burgers in Nigeria. Made with love, served with a smile.</p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to={ROUTES.MENU}>Menu</Link></li>
            <li><Link to={ROUTES.GALLERY}>Gallery</Link></li>
            <li><Link to={ROUTES.ABOUT}>About Us</Link></li>
            <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
            <li><Link to={ROUTES.FAQ}>FAQ</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>123 Burger Lane, Lagos, Nigeria</p>
          <p>contact@rikaburgerng.com</p>
          <p>+234 123 456 7890</p>
        </div>
        <div className="footer-section social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Facebook"><FaFacebook /></a>
            <a href="https://instagram.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram"><FaInstagram /></a>
            <a href="https://twitter.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Twitter"><FaTwitter /></a>
          </div>
        </div>
      </Container>
      <Container className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} RikaburgerNG. All Rights Reserved.</p>
        <div>
          <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
          <Link to={ROUTES.TERMS_OF_SERVICE}>Terms of Service</Link>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
