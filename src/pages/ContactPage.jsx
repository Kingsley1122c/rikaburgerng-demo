import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import Button from '../components/ui/Button';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div className="contact-page">
      <PageHeader
        title="Contact Us"
        subtitle="Reach out for orders, private events, partnerships, and customer support."
      />

      <section className="contact-section">
        <Container>
          <div className="contact-layout">
            <Reveal>
              <motion.article className="contact-form-card" whileHover={{ y: -3 }}>
                <h2>Send Us a Message</h2>
                <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
                  <input type="text" placeholder="Full Name" required aria-label="Full name" />
                  <input type="email" placeholder="Email Address" required aria-label="Email address" />
                  <input type="tel" placeholder="Phone Number" required aria-label="Phone number" />
                  <textarea placeholder="How can we help you?" required aria-label="Message" />
                  <Button type="submit">Send Message</Button>
                </form>
              </motion.article>
            </Reveal>

            <Reveal delay={0.06}>
              <motion.aside className="contact-info-card" whileHover={{ y: -3 }}>
                <h2>Contact Details</h2>
                <div className="contact-rows">
                  <p><strong>Email:</strong> hello@rikaburgerng.com</p>
                  <p><strong>Phone:</strong> +234 800 000 0000</p>
                  <p><strong>Address:</strong> Placeholder address to be replaced by the client</p>
                </div>

                <h3>Business Hours</h3>
                <ul className="hours-list">
                  <li><span>Monday - Thursday</span><span>10:00 AM - 10:00 PM</span></li>
                  <li><span>Friday - Saturday</span><span>10:00 AM - 11:30 PM</span></li>
                  <li><span>Sunday</span><span>12:00 PM - 9:30 PM</span></li>
                </ul>

                <a
                  className="whatsapp-btn"
                  href="https://wa.me/2341234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with us on WhatsApp"
                >
                  <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
                </a>

                <div className="contact-map" role="img" aria-label="Google Maps preview placeholder">
                  <div>
                    <h3>Google Maps</h3>
                    <p>Map embed placeholder. Address pinpoint integration can be added next.</p>
                  </div>
                </div>

                <div className="social-row" aria-label="Social media links">
                  <a href="https://facebook.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                  <a href="https://instagram.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                  <a href="https://x.com/rikaburgerng" target="_blank" rel="noopener noreferrer" aria-label="X"><FaTwitter /></a>
                </div>
              </motion.aside>
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ContactPage;
