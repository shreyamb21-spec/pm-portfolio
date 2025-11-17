import React from 'react';
import ContactFooter from '../components/ContactFooter';

// Journey page component
// Props: workExperience, personalProjects
const JourneyPage = ({ workExperience, personalProjects, user }) => {
  const allProjects = [...workExperience, ...personalProjects];
  const sortedProjects = allProjects.sort((a, b) => 0); // keep original order if no date parser available

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Product Journey</h1>
          <p className="page-subtitle">Key milestones in my product management experience</p>
        </div>

        <div className="timeline">
          {sortedProjects.map((project, index) => (
            <div key={project.id} className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="timeline-content">
                <div className="timeline-period">{project.period}</div>
                <h3 className="timeline-title">{project.name}</h3>
                <div className="timeline-company">{project.company}</div>
                <div className="timeline-outcome">{project.outcomes && project.outcomes[0]}</div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default JourneyPage;
