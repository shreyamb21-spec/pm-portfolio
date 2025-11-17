import React, { useState } from 'react';
import ContactFooter from '../components/ContactFooter';

// Metrics page component
// Props: metrics (array)
const MetricsPage = ({ metrics, user }) => {
  const [selectedScenario, setSelectedScenario] = useState('Baseline');

  const scenarios = {
    'Baseline': {
      title: 'Baseline Performance',
      description: 'Starting metrics before optimization',
      metrics: [
        { label: 'Test Cycles', value: '100%', trend: 'neutral' },
        { label: 'Accuracy', value: '100%', trend: 'neutral' },
        { label: 'Delivery Time', value: '100%', trend: 'neutral' },
        { label: 'User Satisfaction', value: '70%', trend: 'neutral' }
      ]
    },
    'IITB': {
      title: 'IIT Bombay Simulation',
      description: 'Unity-based truckload optimization results',
      metrics: [
        { label: 'Test Cycles', value: '↓40%', trend: 'positive' },
        { label: 'Simulation Accuracy', value: '↑30%', trend: 'positive' },
        { label: 'Prototype Scalability', value: '↑100%', trend: 'positive' },
        { label: 'Research Velocity', value: '↑60%', trend: 'positive' }
      ]
    }
  };

  const currentScenario = scenarios[selectedScenario] || scenarios['Baseline'];

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Impact Metrics</h1>
          <p className="page-subtitle">Measurable outcomes and interactive scenarios</p>
        </div>

        <div className="metrics-section">
          <h3 className="section-subtitle">Key Performance Indicators</h3>
          <div className="metrics-grid-single">
            {metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <div className="metric-value-kpi">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
                <div className="metric-description">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h3 className="section-subtitle">Interactive Scenario Dashboard</h3>
          <div className="dashboard-controls">
            <div className="custom-select">
              <select value={selectedScenario} onChange={(e) => setSelectedScenario(e.target.value)} className="scenario-select">
                {Object.keys(scenarios).map((scenario) => (
                  <option key={scenario} value={scenario}>{scenario}</option>
                ))}
              </select>
              <div className="select-arrow">⌄</div>
            </div>
          </div>

          <div className="scenario-info">
            <h4 className="scenario-title">{currentScenario.title}</h4>
            <p className="scenario-description">{currentScenario.description}</p>
          </div>

          <div className="dashboard-metrics-single">
            {currentScenario.metrics.map((metric, index) => (
              <div key={index} className={`dashboard-card ${metric.trend}`}>
                <div className="dashboard-label">{metric.label}</div>
                <div className="dashboard-value">{metric.value}</div>
                <div className="dashboard-bar"><div className={`progress-bar ${metric.trend}`}></div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactFooter user={user} />
    </div>
  );
};

export default MetricsPage;
