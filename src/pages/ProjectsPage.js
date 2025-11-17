import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';

// Projects page component
// Props: personalProjects (array)
const ProjectsPage = ({ personalProjects, user }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const uniqueStackItems = [...new Set(personalProjects.flatMap(project => project.stack))].sort();
  const filteredProjects = activeFilter === 'All' ? personalProjects : personalProjects.filter(project => project.stack.includes(activeFilter));

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Personal Projects</h1>
          <p className="page-subtitle">Academic and personal product initiatives</p>
        </div>

        <div className="filter-section">
          <button className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => setActiveFilter('All')}>All</button>
          {uniqueStackItems.map((tech) => (
            <button key={tech} className={`filter-btn ${activeFilter === tech ? 'active' : ''}`} onClick={() => setActiveFilter(tech)}>{tech}</button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <div className="project-period">{project.period}</div>
                <h3 className="project-name">{project.name}</h3>
                <div className="project-company">{project.company} • {project.role}</div>
              </div>

              <div className="project-content">
                <div className="project-section"><h4>Problem</h4><p>{project.problem}</p></div>
                <div className="project-section"><h4>Solution</h4><p>{project.bet}</p></div>
                <div className="project-section"><h4>Key Outcomes</h4><ul className="outcomes-list">{project.outcomes.map((outcome, i) => <li key={i}>{outcome}</li>)}</ul></div>
                <div className="project-stack">{project.stack.map((tech, index) => <span key={index} className="stack-tag">{tech}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default ProjectsPage;
