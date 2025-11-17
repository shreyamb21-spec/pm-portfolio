import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';

// Experiments page component
// Props: experiments (array)
const ExperimentsPage = ({ experiments, user }) => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const parseMetric = (result) => {
    if (!result) return { metric: 'N/A', baseline: 'N/A', target: 'N/A', trend: 'neutral' };
    if (result.includes('reduction') || result.includes('↓')) {
      const match = result.match(/(\d+)%/);
      const improvement = match ? parseInt(match[1]) : 0;
      return { metric: `${improvement}% Reduction`, baseline: '100%', target: `${100 - improvement}%`, trend: 'positive' };
    } else if (result.includes('improvement') || result.includes('↑') || result.includes('+')) {
      const match = result.match(/(\d+)%/);
      const improvement = match ? parseInt(match[1]) : 0;
      return { metric: `${improvement}% Improvement`, baseline: 'N/A', target: 'Achieved', trend: 'positive' };
    }
    return { metric: result, baseline: 'N/A', target: 'Achieved', trend: 'neutral' };
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Product Experiments</h1>
          <p className="page-subtitle">Hypothesis-driven improvements with detailed analysis</p>
        </div>

        <div className="experiments-overview">
          <p className="experiments-intro">I believe in hypothesis-driven product development. Each experiment below represents a systematic approach.</p>
        </div>

        <div className="experiments-grid">
          {experiments.map((experiment, index) => {
            const metricData = parseMetric(experiment.result);
            const isExpanded = selectedExperiment === experiment.id;
            return (
              <div key={experiment.id} className={`experiment-card ${isExpanded ? 'expanded' : ''}`}>
                <div className="experiment-header">
                  <div className="experiment-number">#{String(index + 1).padStart(2, '0')}</div>
                  <div className="experiment-category">{experiment.category}</div>
                </div>
                <h3 className="experiment-title">{experiment.name}</h3>
                <div className="experiment-context"><h4>Context & Challenge</h4><p>{experiment.context}</p></div>
                <div className="experiment-hypothesis"><h4>Hypothesis</h4><p className="hypothesis-text">"{experiment.hypothesis}"</p></div>
                <div className="experiment-metric"><span className="metric-label">Result:</span><span className="metric-value"> {metricData.metric}</span></div>

                <div className="baseline-target">
                  <div className="baseline"><span className="bt-label">Baseline</span><span className="bt-value">{metricData.baseline}</span></div>
                  <div className="arrow">→</div>
                  <div className="target"><span className="bt-label">Result</span><span className="bt-value">{metricData.target}</span></div>
                </div>

                <button className="expand-btn" onClick={() => setSelectedExperiment(isExpanded ? null : experiment.id)}>
                  {isExpanded ? 'Show Less' : 'Show Details'}
                </button>

                {isExpanded && (
                  <div className="experiment-details">
                    <div className="detail-section"><h4>Methodology Overview</h4><p>{experiment.methodology}</p></div>
                    <div className="detail-section"><h4>Detailed Implementation</h4><p>{experiment.detailedMethodology}</p></div>
                    <div className="detail-section"><h4>Impact & Outcomes</h4><p>{experiment.impact}</p></div>
                    <div className="detail-section"><h4>Key Learnings</h4><p>{experiment.learnings}</p></div>
                    <div className="detail-section"><h4>Next Steps</h4><p>{experiment.nextSteps}</p></div>
                    <div className="experiment-meta-detailed"><div className="meta-row"><div className="meta-item"><span className="meta-label">Duration</span><span className="meta-value">{experiment.duration}</span></div><div className="meta-item"><span className="meta-label">Confidence Level</span><span className="meta-value">{experiment.confidence}</span></div></div></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default ExperimentsPage;
