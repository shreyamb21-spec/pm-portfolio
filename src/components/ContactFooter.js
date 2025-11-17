import React from 'react';

// Contact footer component
// Expects `user` object with contact details
const ContactFooter = ({ user }) => {
  return (
    <footer id="contact-footer" className="contact-footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3 className="footer-title">Let's Connect</h3>
          <p className="footer-subtitle">Ready to ship products that matter?</p>

          <div className="footer-links">
            <a href={`mailto:${user.email}`} className="footer-link">📧 {user.email}</a>
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">💼 LinkedIn</a>
            <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="footer-link">📄 Resume</a>
            <a href="https://calendly.com/sb10286-nyu/30min" className="footer-link">📅 Book a 15-min Call</a>
          </div>

          <div className="footer-note">
            <p>© 2025 Shreyam Borah. All rights reserved.</p>
            <p>Open to Product Management roles • {user.location} • Open to relocate</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
