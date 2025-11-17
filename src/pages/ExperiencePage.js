import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';

// Experience page component
// Props: workExperience (array)
const ExperiencePage = ({ workExperience, user }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const uniqueStackItems = [...new Set(workExperience.flatMap(exp => exp.stack))].sort();
  const filteredExperience = activeFilter === 'All' ? workExperience : workExperience.filter(exp => exp.stack.includes(activeFilter));

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Work Experience</h1>
          <p className="page-subtitle">Professional roles and measurable impact</p>
        </div>

        <div className="filter-section">
          <button className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => setActiveFilter('All')}>All</button>
          {uniqueStackItems.map((tech) => (
            <button key={tech} className={`filter-btn ${activeFilter === tech ? 'active' : ''}`} onClick={() => setActiveFilter(tech)}>{tech}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredExperience.map((exp) => (
            <div key={exp.id} className="project-card">
              <div className="project-header">
                <div className="project-period">{exp.period}</div>
                <h3 className="project-name">{exp.name}</h3>
                <div className="project-company">{exp.company} • {exp.role}</div>
              </div>

              <div className="project-content">
                <div className="project-section"><h4>Challenge</h4><p>{exp.problem}</p></div>
                <div className="project-section"><h4>Solution Approach</h4><p>{exp.bet}</p></div>
                <div className="project-section"><h4>Key Outcomes</h4><ul className="outcomes-list">{exp.outcomes.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                <div className="project-stack">{exp.stack.map((tech, index) => <span key={index} className="stack-tag">{tech}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default ExperiencePage;
