import React from 'react';
import ContactFooter from '../components/ContactFooter';

// Home page component
// Props required:
// - user, coreSkills, technicalSkills, toolsSkills
const HomePage = ({ user, coreSkills, technicalSkills, toolsSkills }) => {
  return (
    <div className="page home-page">
      <div className="page-container">
        <div className="hero-section">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder"><img src="/shreyam2.jpg" alt="SB" className="avatar-img" /></div>
            </div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-title">Aspiring Product Manager</p>
            <p className="profile-location">{user.location} • Open to relocate</p>

            <div className="profile-links">
              <a href={`mailto:${user.email}`} className="profile-link">📧 Email</a>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">💼 LinkedIn</a>
              <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="profile-link">📄 Resume</a>
            </div>
          </div>

          <div className="intro-section">
            <h2 className="intro-title">I build products that ship.</h2>
            <div className="intro-content">
              <p className="intro-description">
                I'm an aspiring product manager with hands-on experience turning research into specs, specs into prototypes, and prototypes into measurable outcomes.
              </p>

              <div className="intro-highlights">
                <div className="highlight-item">
                  <span className="highlight-number">30+</span>
                  <span className="highlight-label">User Interviews</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">5</span>
                  <span className="highlight-label">Products Shipped</span>
                </div>
                <div className="highlight-item">
                  <span className="highlight-number">40%</span>
                  <span className="highlight-label">Avg Improvement</span>
                </div>
              </div>

              <p className="intro-philosophy">Currently completing my Master's in Management of Technology at NYU, I bring a unique blend of technical expertise and business acumen.</p>
            </div>
          </div>
        </div>

        <div className="skills-container">
          <h3 className="skills-main-title">Skills & Expertise</h3>
          <div className="skills-sections">
            <div className="skills-section">
              <h4 className="skills-category-title">Product Management</h4>
              <div className="skills-grid">
                {coreSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <span className="skill-icon">{skill.icon}</span>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h4 className="skills-category-title">Technical & Analytics</h4>
              <div className="skills-grid">
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <img src={skill.icon} alt={skill.name} className="skill-icon-white" />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skills-section">
              <h4 className="skills-category-title">Tools & Platforms</h4>
              <div className="skills-grid">
                {toolsSkills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <img src={skill.icon} alt={skill.name} className="skill-icon-white" />
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default HomePage;
