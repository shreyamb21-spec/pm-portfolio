import React, { useState, useEffect, useRef } from 'react';
import mysqlIcon from "./assets/icons/mysql.png";
import pythonIcon from "./assets/icons/python.png";
import excelIcon from "./assets/icons/excel.png";
import analyticsIcon from "./assets/icons/googleanalytics.png";
import figmaIcon from "./assets/icons/figma.png";
import unityIcon from "./assets/icons/unity.png";
import csharpIcon from "./assets/icons/sharp.png";
import confluenceIcon from "./assets/icons/confluence.png";
import jiraIcon from "./assets/icons/jira.png";
import slackIcon from "./assets/icons/slack.png";
import githubIcon from "./assets/icons/github.png";
import googleIcon from "./assets/icons/google.png";
import powerbiIcon from "./assets/icons/powerbi.png";
import tableauIcon from "./assets/icons/tableau.png";




// Data
const user = {
  name: "Shreyam Borah",
  title: "Product Manager & Technical Analyst",
  location: "New York City, NY",
  email: "shreyamb21@gmail.com",
  phone: "+1 (201) 469 1480",
  linkedin: "https://linkedin.com/in/shreyamborah/",
  resumeLink: "#",
  openToRelocate: true
};

const metrics = [
  {
    label: "User Interviews",
    value: "30+",
    description: "Conducted to validate pain points and MVP requirements"
  },
  {
    label: "Test Cycles",
    value: "↓40%",
    description: "Reduction through modular design and simulation tools"
  },
  {
    label: "Simulation Accuracy",
    value: "↑30%",
    description: "Improvement via enhanced UI components and tools"
  },
  {
    label: "Delivery Delays",
    value: "↓15%",
    description: "Reduction through integrated KPI tracking dashboards"
  }
];

const coreSkills = [
  { name: "Product Strategy", icon: "🎯" },
  { name: "User Research", icon: "🔍" },
  { name: "Market Research", icon: "📊" },
  { name: "PRD Writing", icon: "📝" },
  { name: "Agile/Scrum", icon: "🔄" },
  { name: "A/B Testing", icon: "⚖️" },
  { name: "UX/UI Design", icon: "🎨" },
  { name: "Roadmapping", icon: "🗺️" }
];

const technicalSkills = [
  { name: "SQL/MySQL", icon:mysqlIcon },
  { name: "Python", icon: pythonIcon},
  { name: "Tableau", icon: tableauIcon },
  { name: "Power BI", icon: powerbiIcon},
  { name: "Excel", icon: excelIcon },
  { name: "Google Analytics", icon: analyticsIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "Unity", icon: unityIcon},
  { name: "C# Scripting", icon: csharpIcon }
];

const toolsSkills = [
  { name: "Jira", icon: jiraIcon},
  { name: "Confluence", icon: confluenceIcon},
  { name: "Google Workspace", icon: googleIcon },
  { name: "Slack", icon: slackIcon },
  { name: "GitHub", icon: githubIcon}
];

// Work experience and projects data
const workExperience = [
  {
    id: "iitb-simulator",
    name: "Unity Truckload Optimization Simulator",
    period: "Jan 2024 – Jun 2024",
    company: "IIT Bombay",
    role: "Technical Analyst",
    problem: "Testing optimization models required expensive physical prototypes and lengthy validation cycles, limiting researchers' ability to run iterative experiments.",
    bet: "An interactive Unity-based simulation with real-time manipulation tools would enable rapid 'what-if' analysis and cut testing cycles significantly.",
    myRole: "Technical Analyst - Led ideation, development, and stakeholder alignment with PhD researchers",
    outcomes: [
      "40% reduction in testing cycles through modular design",
      "30% improvement in simulation accuracy via enhanced UI",
      "Scalable JSON-integrated prototype delivered for pilot use"
    ],
    stack: ["Unity", "C#", "JSON", "3D Modeling"],
    links: { demo: "#", github: "#" }
  },
  {
    id: "caarya-funnel",
    name: "Founder Engagement Funnel",
    period: "Jun 2023 – Dec 2023", 
    company: "Caarya",
    role: "Product Management Intern",
    problem: "Startup founders struggled with fragmented fundraising and mentorship processes, leading to high drop-off rates and poor conversion.",
    bet: "A systematic engagement funnel with targeted campaigns would improve lead quality and conversion rates for founder-focused services.",
    myRole: "Product Management Intern - Led user research, funnel design, and cross-functional campaign execution",
    outcomes: [
      "25% boost in inbound leads through validated MVP requirements", 
      "20% increase in lead-to-conversion rate",
      "30% increase in qualified leads via 3 targeted campaigns"
    ],
    stack: ["Google Sheets", "Excel", "Campaign Tools"],
    links: { case_study: "#" }
  },
  {
    id: "sarikart-analytics", 
    name: "Artisan Marketplace Analytics Platform",
    period: "Oct 2020 – Mar 2021",
    company: "Sarikart",
    role: "Business Analyst", 
    problem: "12M+ transactions across 12+ artisan collectives were unstandardized, causing data errors and limiting strategic decision-making capabilities.",
    bet: "Consolidated dashboards tracking key metrics would enable data-driven pricing, inventory, and product development decisions.",
    myRole: "Business Analyst - Led data consolidation, dashboard design, and market trend analysis",
    outcomes: [
      "30% reduction in data errors through standardization",
      "8% improvement in daily CTR via Power BI tracking",
      "15% increase in brand visibility through optimized metrics"
    ],
    stack: ["Power BI", "Tableau", "Excel", "SQL"],
    links: { dashboard: "#" }
  }
];

const personalProjects = [
  {
    id: "homies-platform",
    name: "First-Time Homebuyer Platform", 
    period: "Sept 2024 - Present",
    company: "NYU Project",
    role: "Product Designer & Strategy Lead",
    problem: "Affluent families lack efficient tools to support their children's first home purchases, facing challenges in collaborative savings and financing coordination.",
    bet: "A platform combining gamified savings tools with seller-bank connections would reduce buyer financial stress and streamline the home purchase process.",
    myRole: "Product Designer & Strategy Lead - Led product design, market sizing, and GTM planning",
    outcomes: [
      "$119M/yr NYC metro TAM identified",
      "2 MVP features planned: savings tool + seller connector",
      "GTM strategy developed with referral programs and B2B2C partnerships"
    ],
    stack: ["Figma", "Market Research", "Financial Modeling"],
    links: { prototype: "#", pitch_deck: "#" }
  },
  {
    id: "indicverse-vr",
    name: "Indus Valley Civilization VR Experience",
    period: "2022 - 2024",
    company: "Personal Project",
    role: "VR Developer & UX Lead",
    problem: "Historical education lacks immersive experiences that help students understand ancient civilizations through spatial and interactive learning.",
    bet: "An interactive VR prototype would enhance historical education by providing immersive, data-driven experiences of ancient civilizations.",
    myRole: "VR Developer & UX Lead - Led development, historian partnerships, and user testing",
    outcomes: [
      "90%+ positive user feedback achieved",
      "Interactive C# scripting for dynamic experiences", 
      "Successful partnership with historians and educators"
    ],
    stack: ["Unity", "C#", "VR Development", "3D Modeling"],
    links: { demo: "#", github: "#" }
  }
];

const experiments = [
  {
    id: "handoff-checklist",
    name: "Product Handoff Checklist Implementation",
    category: "Process Optimization",
    context: "Development teams were experiencing frequent miscommunication during design-to-development handoffs, leading to rework and missed deadlines. The existing process was informal and inconsistent across different teams.",
    hypothesis: "Standardizing handoff processes will reduce miscommunication and project delays",
    methodology: "Implemented structured checklist for design-to-development handoffs with mandatory sign-offs",
    detailedMethodology: "Created a comprehensive 15-point checklist covering design specifications, interaction details, edge cases, and acceptance criteria. Introduced mandatory stakeholder sign-offs at each handoff point. Conducted training sessions with design and development teams. Established feedback loops to continuously improve the checklist based on team input.",
    result: "15% reduction in project delivery delays",
    impact: "Improved stakeholder communication and team alignment",
    duration: "3 months",
    confidence: "High",
    learnings: "Clear documentation and accountability checkpoints significantly reduce ambiguity. Team buy-in is crucial for process adoption success.",
    nextSteps: "Scale to other product teams and integrate with project management tools for automated tracking."
  },
  {
    id: "onboarding-nps",
    name: "NPS Integration in User Onboarding",
    category: "User Experience Research",
    context: "User retention rates were declining in the first 30 days, but we lacked specific feedback on friction points during the onboarding experience. Traditional analytics showed where users dropped off but not why.",
    hypothesis: "Collecting NPS feedback during onboarding will identify friction points and improve retention", 
    methodology: "Added NPS surveys at key onboarding milestones with follow-up interviews for detractors",
    detailedMethodology: "Integrated micro-NPS surveys at 3 key onboarding stages: account creation, first core action completion, and 7-day mark. For users scoring 0-6, triggered immediate follow-up interviews within 24 hours. Analyzed feedback themes and correlated with behavioral data to identify specific pain points.",
    result: "+5pp improvement in user retention",
    impact: "Enhanced user experience and reduced churn in first 30 days",
    duration: "2 months", 
    confidence: "Medium-High",
    learnings: "Real-time feedback collection is more valuable than post-experience surveys. Detractor interviews revealed issues not visible in quantitative data.",
    nextSteps: "Implement automated response workflows for different NPS score ranges and expand to post-onboarding touchpoints."
  },
  {
    id: "modular-simulation",
    name: "Modular Design for Simulation Testing",
    category: "Technical Architecture",
    context: "The existing simulation system was monolithic, making it difficult to test individual components or iterate quickly. Researchers needed to run full simulations even for small changes, creating bottlenecks in the development cycle.",
    hypothesis: "Breaking simulation into modular components will accelerate testing cycles",
    methodology: "Redesigned monolithic simulation into independent, reusable modules with standardized interfaces",
    detailedMethodology: "Conducted architecture review to identify logical component boundaries. Developed standardized API interfaces for inter-module communication. Created isolated test environments for each module. Implemented version control for module dependencies. Built automated testing pipeline for individual modules and integration scenarios.",
    result: "40% reduction in testing cycle time",
    impact: "Enabled rapid iteration for research teams and improved prototype scalability",
    duration: "4 months",
    confidence: "High",
    learnings: "Modular architecture requires upfront investment but pays dividends in development velocity. Clear interface definitions are critical for module independence.",
    nextSteps: "Develop module marketplace for sharing reusable components across research teams."
  },
  {
    id: "targeted-campaigns",
    name: "Segmented Founder Outreach Campaigns", 
    category: "Growth & Marketing",
    context: "Broad outreach campaigns were generating high volume but low-quality leads. Conversion rates were declining as the founder pool became more saturated with generic messaging.",
    hypothesis: "Targeted campaigns based on founder stage will improve lead quality over broad outreach",
    methodology: "Segmented founders by funding stage and created tailored content for each segment",
    detailedMethodology: "Analyzed existing user data to identify 4 distinct founder segments: pre-seed, seed, Series A, and growth stage. Developed persona-specific messaging, case studies, and value propositions for each segment. Created separate email sequences and landing pages. A/B tested messaging variants within each segment. Tracked engagement and conversion metrics by segment.",
    result: "30% increase in qualified leads",
    impact: "Higher conversion rates and better product-market fit validation",
    duration: "6 months",
    confidence: "High",
    learnings: "Personalization at scale requires robust data infrastructure. Segment-specific messaging resonates significantly better than one-size-fits-all approaches.",
    nextSteps: "Implement dynamic content personalization and expand segmentation to include industry vertical targeting."
  }
];

// Dark Mode Toggle Component
const DarkModeToggle = ({ isDark, setIsDark }) => {
  return (
    <button 
      className="dark-mode-toggle"
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle dark mode"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
};

// Enhanced Navigation Component with responsive design and precise centering
const Navigation = ({ currentPage, setCurrentPage, isDark, setIsDark }) => {
  const [highlightStyle, setHighlightStyle] = useState({ width: 0, left: 0 });
  const navRef = useRef(null);
  const pillRefs = useRef([]);

  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'experiments', label: 'Experiments' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' }
  ];

  const updateHighlight = () => {
    const currentIndex = pages.findIndex(page => page.id === currentPage);
    if (currentIndex !== -1 && pillRefs.current[currentIndex] && navRef.current) {
      const currentPill = pillRefs.current[currentIndex];
      const navContainer = navRef.current;
      
      const pillRect = currentPill.getBoundingClientRect();
      const navRect = navContainer.getBoundingClientRect();
      
      const left = pillRect.left - navRect.left;
      const width = pillRect.width;
      
      setHighlightStyle({ left, width });
    }
  };

  useEffect(() => {
    updateHighlight();
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [currentPage]);

  const handleNavClick = (pageId) => {
    if (pageId === 'contact') {
      const footer = document.getElementById('contact-footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPage(pageId);
    }
  };

  return (
    <div className="nav-container">
      <nav className="floating-nav">
        <div className="nav-pills" ref={navRef}>
          <div 
            className="nav-highlight" 
            style={{ 
              transform: `translateX(${highlightStyle.left - 8}px)`, 
              width: `${highlightStyle.width}px`
            }}
          ></div>
          {pages.map((page, index) => (
            <button
              key={page.id}
              ref={el => pillRefs.current[index] = el}
              onClick={() => handleNavClick(page.id)}
              className={`nav-pill ${currentPage === page.id && page.id !== 'contact' ? 'active' : ''}`}
            >
              {page.label}
            </button>
          ))}
        </div>
         {/* <DarkModeToggle isDark={isDark} setIsDark={setIsDark} /> */}
      </nav>
      
    </div>
  );
 
};

// Contact Footer Component
const ContactFooter = () => {
  return (
    <footer id="contact-footer" className="contact-footer">
      <div className="footer-container">
        <div className="footer-content">
          <h3 className="footer-title">Let's Connect</h3>
          <p className="footer-subtitle">Ready to ship products that matter?</p>
          
          <div className="footer-links">
                        <a href={`mailto:${user.email}`} className="footer-link">
              📧 {user.email}
            </a>
            <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
              💼 LinkedIn
            </a>

            <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="footer-link">
              📄 Resume
            </a>
             <a 
            href="https://calendly.com/sb10286-nyu/30min" 
            className="footer-link"
            // onClick={(e) => {
            //   e.preventDefault();
            //   alert('https://calendly.com/sb10286-nyu/30min');
            // }}
          >
            📅 Book a 15-min Call
          </a>
          </div>

          {/* <a 
            href="https://calendly.com/sb10286-nyu/30min" 
            className="footer-cta"
            // onClick={(e) => {
            //   e.preventDefault();
            //   alert('https://calendly.com/sb10286-nyu/30min');
            // }}
          >
            📅 Book a 15-min Call
          </a> */}

          <div className="footer-note">
            <p>© 2025 Shreyam Borah. All rights reserved.</p>
            <p>Open to Product Management roles • {user.location} • Open to relocate</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const HomePage = () => {
  return (
    <div className="page home-page">
      <div className="page-container">
        <div className="hero-section">
          <div className="profile-card">
            <div className="profile-avatar">
              <div className="avatar-placeholder">SB</div>
            </div>
            <h1 className="profile-name">{user.name}</h1>
            <p className="profile-title">Aspiring Product Manager</p>
            <p className="profile-location">{user.location} • Open to relocate</p>
            
            <div className="profile-links">
              <a href={`mailto:${user.email}`} className="profile-link">
                📧 Email
              </a>
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                💼 LinkedIn
              </a>
              <a href={user.resumeLink} target="_blank" rel="noopener noreferrer" className="profile-link">
                📄 Resume
              </a>
            </div>
          </div>

          <div className="intro-section">
            <h2 className="intro-title">I build products that ship.</h2>
            <div className="intro-content">
              <p className="intro-description">
                I'm an aspiring product manager with hands-on experience turning research into specs, specs into prototypes, 
                and prototypes into measurable outcomes. Currently seeking product management opportunities where I can leverage 
                my analytical background and user-centered approach to drive product success.
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

              <p className="intro-philosophy">
                Currently completing my Master's in Management of Technology at NYU, I bring a unique blend of technical expertise 
                and business acumen. My experience spans user research, data analysis, and cross-functional collaboration across 
                startup and academic environments. I'm passionate about solving complex problems through thoughtful product strategy 
                and data-driven decision making.
              </p>

              <div className="job-seeking-cta">
                <p className="seeking-text">🎯 <strong>Currently seeking</strong> full-time Product Manager roles where I can contribute to meaningful products and continue growing my PM skills.</p>
              </div>
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
  <div className="skills-grid " >
    {technicalSkills.map((skill, index) => (
      <div key={index} className="skill-item">
        {/* Render images properly */}
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
      {/* If skill.icon is an imported image */}
      <img src={skill.icon} alt={skill.name} className="skill-icon-white" />

      {/* If skill.icon is an emoji string */}
      {/* <span className="skill-icon">{skill.icon}</span> */}

      <span className="skill-name">{skill.name}</span>
    </div>
  ))}
</div>

            </div>
          </div>
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Combined Metrics Page Component
const MetricsPage = () => {
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
    },
    'Caarya': {
      title: 'Caarya Funnel Optimization',
      description: 'Founder engagement and conversion improvements',
      metrics: [
        { label: 'Delivery Delays', value: '↓15%', trend: 'positive' },
        { label: 'Lead→Conversion', value: '↑20%', trend: 'positive' },
        { label: 'Inbound Leads', value: '↑25%', trend: 'positive' },
        { label: 'Qualified Leads', value: '↑30%', trend: 'positive' }
      ]
    },
    'Sarikart': {
      title: 'Sarikart Analytics Platform',
      description: 'Data-driven marketplace optimization',
      metrics: [
        { label: 'Daily CTR', value: '↑8%', trend: 'positive' },
        { label: 'Brand Visibility', value: '↑15%', trend: 'positive' },
        { label: 'Data Errors', value: '↓30%', trend: 'positive' },
        { label: 'Market Share', value: '↑5%', trend: 'positive' }
      ]
    },
    'Indicverse': {
      title: 'Indicverse VR Experience',
      description: 'Interactive historical education platform',
      metrics: [
        { label: 'User Satisfaction', value: '90%+', trend: 'positive' },
        { label: 'Educational Impact', value: '↑85%', trend: 'positive' },
        { label: 'Engagement Time', value: '↑120%', trend: 'positive' },
        { label: 'Learning Retention', value: '↑75%', trend: 'positive' }
      ]
    }
  };

  const currentScenario = scenarios[selectedScenario];

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
                <div className="metric-value">{metric.value}</div>
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
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="scenario-select"
              >
                {Object.keys(scenarios).map((scenario) => (
                  <option key={scenario} value={scenario}>
                    {scenario}
                  </option>
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
                <div className="dashboard-bar">
                  <div className={`progress-bar ${metric.trend}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Experience Page Component
const ExperiencePage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const uniqueStackItems = [...new Set(workExperience.flatMap(exp => exp.stack))].sort();
  const filteredExperience = activeFilter === 'All' 
    ? workExperience 
    : workExperience.filter(exp => exp.stack.includes(activeFilter));

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Work Experience</h1>
          <p className="page-subtitle">Professional roles and measurable impact</p>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          {uniqueStackItems.map((tech) => (
            <button
              key={tech}
              className={`filter-btn ${activeFilter === tech ? 'active' : ''}`}
              onClick={() => setActiveFilter(tech)}
            >
              {tech}
            </button>
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
                <div className="project-section">
                  <h4>Challenge</h4>
                  <p>{exp.problem}</p>
                </div>

                <div className="project-section">
                  <h4>Solution Approach</h4>
                  <p>{exp.bet}</p>
                </div>

                <div className="project-section">
                  <h4>Key Outcomes</h4>
                  <ul className="outcomes-list">
                    {exp.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-stack">
                  {exp.stack.map((tech, index) => (
                    <span key={index} className="stack-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Projects Page Component
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const uniqueStackItems = [...new Set(personalProjects.flatMap(project => project.stack))].sort();
  const filteredProjects = activeFilter === 'All' 
    ? personalProjects 
    : personalProjects.filter(project => project.stack.includes(activeFilter));

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Personal Projects</h1>
          <p className="page-subtitle">Academic and personal product initiatives</p>
        </div>

        <div className="filter-section">
          <button
            className={`filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            onClick={() => setActiveFilter('All')}
          >
            All
          </button>
          {uniqueStackItems.map((tech) => (
            <button
              key={tech}
              className={`filter-btn ${activeFilter === tech ? 'active' : ''}`}
              onClick={() => setActiveFilter(tech)}
            >
              {tech}
            </button>
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
                <div className="project-section">
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>

                <div className="project-section">
                  <h4>Solution</h4>
                  <p>{project.bet}</p>
                </div>

                <div className="project-section">
                  <h4>Key Outcomes</h4>
                  <ul className="outcomes-list">
                    {project.outcomes.map((outcome, index) => (
                      <li key={index}>{outcome}</li>
                    ))}
                  </ul>
                </div>

                <div className="project-stack">
                  {project.stack.map((tech, index) => (
                    <span key={index} className="stack-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Enhanced Experiments Page Component
const ExperimentsPage = () => {
  const [selectedExperiment, setSelectedExperiment] = useState(null);

  const parseMetric = (result) => {
    if (result.includes('reduction') || result.includes('↓')) {
      const match = result.match(/(\d+)%/);
      const improvement = match ? parseInt(match[1]) : 0;
      return {
        metric: `${improvement}% Reduction`,
        baseline: '100%',
        target: `${100 - improvement}%`,
        trend: 'positive'
      };
    } else if (result.includes('improvement') || result.includes('↑') || result.includes('+')) {
      const match = result.match(/(\d+)(?:pp|%)/);
      const improvement = match ? parseInt(match[1]) : 0;
      return {
        metric: `+${improvement}${result.includes('pp') ? 'pp' : '%'} Improvement`,
        baseline: result.includes('pp') ? '45%' : '100%',
        target: result.includes('pp') ? `${45 + improvement}%` : `${100 + improvement}%`,
        trend: 'positive'
      };
    }
    return {
      metric: result,
      baseline: 'N/A',
      target: 'Achieved',
      trend: 'neutral'
    };
  };

  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Product Experiments</h1>
          <p className="page-subtitle">Hypothesis-driven improvements with detailed analysis</p>
        </div>

        <div className="experiments-overview">
          <p className="experiments-intro">
            I believe in hypothesis-driven product development. Each experiment below represents a systematic 
            approach to identifying problems, forming hypotheses, designing tests, and measuring outcomes. 
            This methodology ensures that product decisions are data-informed and user-centered.
          </p>
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
                
                <div className="experiment-context">
                  <h4>Context & Challenge</h4>
                  <p>{experiment.context}</p>
                </div>

                <div className="experiment-hypothesis">
                  <h4>Hypothesis</h4>
                  <p className="hypothesis-text">"{experiment.hypothesis}"</p>
                </div>
                
                <div className="experiment-metric">
                  <span className="metric-label">Result</span>
                  <span className="metric-value">{metricData.metric}</span>
                </div>

                <div className="baseline-target">
                  <div className="baseline">
                    <span className="bt-label">Baseline</span>
                    <span className="bt-value">{metricData.baseline}</span>
                  </div>
                  <div className="arrow">→</div>
                  <div className="target">
                    <span className="bt-label">Result</span>
                    <span className="bt-value">{metricData.target}</span>
                  </div>
                </div>

                <button 
                  className="expand-btn"
                  onClick={() => setSelectedExperiment(isExpanded ? null : experiment.id)}
                >
                  {isExpanded ? 'Show Less' : 'Show Details'}
                </button>

                {isExpanded && (
                  <div className="experiment-details">
                    <div className="detail-section">
                      <h4>Methodology Overview</h4>
                      <p>{experiment.methodology}</p>
                    </div>

                    <div className="detail-section">
                      <h4>Detailed Implementation</h4>
                      <p>{experiment.detailedMethodology}</p>
                    </div>

                    <div className="detail-section">
                      <h4>Impact & Outcomes</h4>
                      <p>{experiment.impact}</p>
                    </div>

                    <div className="detail-section">
                      <h4>Key Learnings</h4>
                      <p>{experiment.learnings}</p>
                    </div>

                    <div className="detail-section">
                      <h4>Next Steps</h4>
                      <p>{experiment.nextSteps}</p>
                    </div>

                    <div className="experiment-meta-detailed">
                      <div className="meta-row">
                        <div className="meta-item">
                          <span className="meta-label">Duration</span>
                          <span className="meta-value">{experiment.duration}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Confidence Level</span>
                          <span className="meta-value">{experiment.confidence}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Journey Page Component
const JourneyPage = () => {
  const allProjects = [...workExperience, ...personalProjects];
  const sortedProjects = allProjects.sort((a, b) => {
    const getStartYear = (period) => {
      const match = period.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    return getStartYear(b.period) - getStartYear(a.period);
  });

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
                <div className="timeline-outcome">{project.outcomes[0]}</div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          ))}
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.body.className = isDark ? 'dark-mode' : '';
  }, [isDark]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'metrics': return <MetricsPage />;
      case 'experience': return <ExperiencePage />;
      case 'projects': return <ProjectsPage />;
      case 'experiments': return <ExperimentsPage />;
      case 'journey': return <JourneyPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="App">
      <style jsx>{`
        /* CSS Variables for Dark Mode */
        :root {
          --bg-primary: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          --bg-secondary: #ffffff;
          --bg-card: #ffffff;
          --text-primary: #1a1a1a;
          --text-secondary: #64748b;
          --text-muted: #94a3b8;
          --border-color: #e2e8f0;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          --shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .dark-mode {
          --bg-primary: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          --bg-secondary: #1e293b;
          --bg-card: #334155;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --text-muted: #94a3b8;
          --border-color: #475569;
          --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
          --shadow-hover: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
        }

        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          line-height: 1.6;
          color: var(--text-primary);
          background: var(--bg-primary);
          min-height: 100vh;
          transition: all 0.3s ease;
        }

        .App {
          min-height: 100vh;
          position: relative;
        }

        /* Navigation Container with Enhanced Responsiveness */
        .nav-container {
          position: fixed;
          top: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 95vw;
        }

        /* Dark Mode Toggle */
        .dark-mode-toggle {
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
          flex-shrink: 0;
        }

        .dark-mode-toggle:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-hover);
        }

        /* Enhanced Floating Navigation */
        .floating-nav {
          display: flex;
          align-items: center;
          overflow-x: auto;
          max-width: 100%;
        }

        .nav-pills {
          display: flex;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(30, 64, 175, 0.1);
          border-radius: 50px;
          padding: 0.5rem;
          box-shadow: var(--shadow);
          position: relative;
          overflow: hidden;
          width: fit-content;
          min-width: max-content;
        }

        .dark-mode .nav-pills {
          background: rgba(51, 65, 85, 0.95);
          border: 1px solid rgba(203, 213, 225, 0.1);
        }

        .nav-highlight {
          position: absolute;
          top: 0.5rem;
          bottom: 0.5rem;
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          border-radius: 25px;
          transition: all 0.75s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 0;
        }

        .nav-pill {
          background: none;
          border: none;
          padding: 0.75rem 1.2rem;
          border-radius: 25px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          position: relative;
          z-index: 1;
          text-align: center;
          min-width: fit-content;
          flex-shrink: 0;
        }

        .nav-pill:hover {
          color: #1e40af;
        }

        .nav-pill.active {
          color: white;
        }

        /* Page Layout */
        .page {
          min-height: 100vh;
          padding-top: 6rem;
          padding-bottom: 2rem;
        }

        .page-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .page-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .section-subtitle {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          text-align: center;
          margin-bottom: 2rem;
        }

        /* Home Page Styles */
        .home-page {
          background: var(--bg-primary);
          color: var(--text-primary);
        }

        .dark-mode .home-page {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
        }

        .hero-section {
          margin-bottom: 4rem;
        }

        .profile-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 2rem;
          padding: 3rem;
          margin-bottom: 1.5rem;
          margin-top: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
          box-shadow: var(--shadow);
        }

        .dark-mode .profile-card {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .profile-avatar {
          margin-bottom: 2rem;
        }

        .avatar-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 auto;
          border: 4px solid var(--border-color);
          color: var(--text-primary);
        }

        .dark-mode .avatar-placeholder {
          background: rgba(255, 255, 255, 0.2);
          border: 4px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .profile-name {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .dark-mode .profile-name {
          color: white;
        }

        .profile-title {
          font-size: 1.25rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }

        .dark-mode .profile-title {
          color: rgba(255, 255, 255, 0.9);
        }

        .profile-location {
          font-size: 1rem;
          opacity: 0.8;
          margin-bottom: 2rem;
          color: var(--text-secondary);
        }

        .dark-mode .profile-location {
          color: rgba(255, 255, 255, 0.8);
        }

        .profile-links {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .profile-link {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
        }

        .dark-mode .profile-link {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .profile-link:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .dark-mode .profile-link:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .intro-section {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .intro-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 2rem;
          line-height: 1.1;
          color: var(--text-primary);
        }

        .dark-mode .intro-title {
          color: white;
        }

        .intro-content {
          text-align: left;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 2rem;
          padding: 3rem;
          box-shadow: var(--shadow);
        }

        .dark-mode .intro-content {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .intro-description {
          font-size: 1.25rem;
          opacity: 0.9;
          line-height: 1.7;
          margin-bottom: 2rem;
          color: var(--text-primary);
        }

        .dark-mode .intro-description {
          color: rgba(255, 255, 255, 0.9);
        }

        .intro-highlights {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 2rem;
          margin: 2rem 0;
          padding: 2rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          border: 1px solid var(--border-color);
        }

        .dark-mode .intro-highlights {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .highlight-item {
          text-align: center;
        }

        .highlight-number {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .dark-mode .highlight-number {
          color: white;
        }

        .highlight-label {
          font-size: 0.875rem;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
        }

        .dark-mode .highlight-label {
          color: rgba(255, 255, 255, 0.8);
        }

        .intro-philosophy {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.7;
          color: var(--text-primary);
        }

        .dark-mode .intro-philosophy {
          color: rgba(255, 255, 255, 0.9);
        }

        .job-seeking-cta {
          margin-top: 2rem;
          padding: 1.5rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          border: 2px solid #22c55e;
          text-align: center;
        }

        .dark-mode .job-seeking-cta {
          background: rgba(34, 197, 94, 0.1);
          border: 2px solid #22c55e;
        }

        .seeking-text {
          font-size: 1.1rem;
          color: var(--text-primary);
          margin: 0;
        }

        .dark-mode .seeking-text {
          color: white;
        }

        /* Skills Container */
        .skills-container {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 2rem;
          padding: 3rem;
          margin-top: 4rem;
          box-shadow: var(--shadow);
        }

        .dark-mode .skills-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .skills-main-title {
          font-size: 2.5rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 3rem;
          color: var(--text-primary);
        }

        .dark-mode .skills-main-title {
          color: white;
        }

        .skills-sections {
          display: grid;
          gap: 3rem;
        }

        .skills-section {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 2rem;
        }

        .dark-mode .skills-section {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .skills-category-title {
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .dark-mode .skills-category-title {
          color: rgba(255, 255, 255, 0.9);
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .skill-item {
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1rem;
          text-align: center;
          font-weight: 500;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .dark-mode .skill-item {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        .skill-item:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .dark-mode .skill-item:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .skill-icon-{
          font-size: 1.5rem;
          

        }
        .skill-icon-white {
          font-size: 1.5rem;
          filter: brightness(0) invert(1); /* makes icons white */

        }

        .skill-name {
          color: var(--text-primary);
        }

        .dark-mode .skill-name {
          color: white;
        }

        /* Metrics Page */
        .metrics-section {
          margin-bottom: 4rem;
        }

        .metrics-grid-single {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 4rem;
        }

        .metric-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 2.5rem;
          text-align: center;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: #f59e0b;
        }

        .metric-value {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .metric-label {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .metric-description {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Dashboard Section */
        .dashboard-section {
          background: var(--bg-card);
          border-radius: 2rem;
          padding: 3rem;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow);
        }

        .dashboard-controls {
          text-align: center;
          margin-bottom: 3rem;
        }

        .custom-select {
          position: relative;
          display: inline-block;
        }

        .scenario-select {
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: 1rem;
          padding: 1rem 3rem 1rem 1.5rem;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 250px;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }

        .scenario-select:focus {
          outline: none;
          border-color: #1e40af;
          box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1);
        }

        .scenario-select:hover {
          border-color: #f59e0b;
        }

        .select-arrow {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          font-size: 1.2rem;
          color: var(--text-secondary);
          font-weight: bold;
        }

        .scenario-info {
          text-align: center;
          margin-bottom: 3rem;
          background: var(--bg-secondary);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid var(--border-color);
        }

        .scenario-title {
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .scenario-description {
          color: var(--text-secondary);
          font-size: 1.1rem;
        }

        .dashboard-metrics-single {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .dashboard-card {
          background: var(--bg-secondary);
          border-radius: 1.5rem;
          padding: 2rem;
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .dashboard-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-hover);
        }

        .dashboard-card.positive {
          border-left: 4px solid #22c55e;
        }

        .dashboard-card.neutral {
          border-left: 4px solid #64748b;
        }

        .dashboard-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .dashboard-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .dashboard-card.positive .dashboard-value {
          color: #22c55e;
        }

        .dashboard-bar {
          height: 4px;
          background: var(--border-color);
          border-radius: 2px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          width: 75%;
          border-radius: 2px;
          transition: width 1s ease;
        }

        .progress-bar.positive {
          background: linear-gradient(90deg, #22c55e, #16a34a);
        }

        .progress-bar.neutral {
          background: linear-gradient(90deg, #64748b, #475569);
        }

        /* Projects/Experience Pages */
        .filter-section {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: var(--bg-card);
          border: 2px solid var(--border-color);
          border-radius: 25px;
          padding: 0.75rem 1.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover, .filter-btn.active {
          border-color: #1e40af;
          color: #1e40af;
          background: rgba(30, 64, 175, 0.05);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .project-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: #f59e0b;
        }

        .project-header {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
          padding: 2rem;
          text-align: center;
        }

        .project-period {
          font-size: 0.875rem;
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .project-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .project-company {
          font-size: 1rem;
          opacity: 0.8;
        }

        .project-content {
          padding: 2rem;
        }

        .project-section {
          margin-bottom: 2rem;
        }

        .project-section h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .project-section p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .outcomes-list {
          list-style: none;
          padding: 0;
        }

        .outcomes-list li {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;
        }

        .outcomes-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #22c55e;
          font-weight: bold;
        }

        .project-stack {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .stack-tag {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border: 1px solid var(--border-color);
        }

        /* Enhanced Experiments Page */
        .experiments-overview {
          background: var(--bg-card);
          border-radius: 1.5rem;
          padding: 2.5rem;
          margin-bottom: 3rem;
          border: 1px solid var(--border-color);
          text-align: center;
        }

        .experiments-intro {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 800px;
          margin: 0 auto;
        }

        .experiments-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 2rem;
        }

        .experiment-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .experiment-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: #f59e0b;
        }

        .experiment-card.expanded {
          grid-column: 1 / -1;
        }

        .experiment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .experiment-number {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 700;
        }

        .experiment-category {
          background: var(--bg-secondary);
          color: var(--text-primary);
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid var(--border-color);
        }

        .experiment-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
        }

        .experiment-context {
          margin-bottom: 1.5rem;
        }

        .experiment-context h4,
        .experiment-hypothesis h4 {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.75rem;
        }

        .experiment-context p {
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .experiment-hypothesis {
          margin-bottom: 1.5rem;
          background: var(--bg-secondary);
          padding: 1.5rem;
          border-radius: 1rem;
          border-left: 4px solid #1e40af;
        }

        .hypothesis-text {
          font-style: italic;
          color: var(--text-primary);
          font-weight: 500;
          line-height: 1.6;
        }

        .experiment-metric {
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .metric-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .metric-value {
          font-size: 1.25rem;
          font-weight: 700;
          color: #22c55e;
        }

        .baseline-target {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--bg-secondary);
          border-radius: 1rem;
          border: 1px solid var(--border-color);
        }

        .baseline, .target {
          text-align: center;
          padding: 0.75rem;
          border-radius: 0.75rem;
        }

        .baseline {
          background: var(--bg-primary);
        }

        .target {
          background: rgba(34, 197, 94, 0.1);
        }

        .bt-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .bt-value {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .arrow {
          font-size: 1.5rem;
          color: #22c55e;
          font-weight: bold;
        }

        .expand-btn {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
          margin-bottom: 1rem;
        }

        .expand-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(30, 64, 175, 0.3);
        }

        .experiment-details {
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
          margin-top: 1rem;
        }

        .detail-section {
          margin-bottom: 2rem;
        }

        .detail-section h4 {
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.75rem;
        }

        .detail-section p {
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .experiment-meta-detailed {
          background: var(--bg-secondary);
          border-radius: 1rem;
          padding: 1.5rem;
          border: 1px solid var(--border-color);
        }

        .meta-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .meta-item {
          text-align: center;
        }

        .meta-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .meta-value {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        /* Timeline Page */
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(180deg, #1e40af, #f59e0b);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
        }

        .timeline-item.left .timeline-content {
          margin-right: auto;
          margin-left: 0;
          width: 45%;
        }

        .timeline-item.right .timeline-content {
          margin-left: auto;
          margin-right: 0;
          width: 45%;
        }

        .timeline-content {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          box-shadow: var(--shadow);
        }

        .timeline-content:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: #f59e0b;
        }

        .timeline-content::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 0;
          height: 0;
          border: 12px solid transparent;
          transform: translateY(-50%);
        }

        .timeline-item.left .timeline-content::before {
          right: -24px;
          border-left-color: var(--bg-card);
        }

        .timeline-item.right .timeline-content::before {
          left: -24px;
          border-right-color: var(--bg-card);
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: var(--bg-card);
          border: 4px solid #f59e0b;
          border-radius: 50%;
          z-index: 2;
        }

        .timeline-period {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .timeline-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .timeline-company {
          color: var(--text-secondary);
          font-weight: 500;
          margin-bottom: 1rem;
        }

        .timeline-outcome {
          color: var(--text-secondary);
          line-height: 1.6;
          padding-left: 1.5rem;
          border-left: 3px solid var(--border-color);
          position: relative;
        }

        .timeline-outcome::before {
          content: '✓';
          position: absolute;
          left: -0.6rem;
          top: 0;
          color: #22c55e;
          font-weight: bold;
          background: var(--bg-card);
          padding: 0 0.25rem;
        }

        /* Contact Footer */
        .contact-footer {
          background: linear-gradient(135deg, #1e40af 0%, #f59e0b 100%);
          color: white;
          padding: 3rem 0;
          margin-top: 4rem;
          margin-bottom: -2rem;
          
          
        }

        .footer-container {
          max-width: fit-content;
          margin: 0 auto;
          padding: 0 2rem;
          
        }

        .footer-content {
          text-align: center;
        }

        .footer-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .footer-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2rem;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .footer-link {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .footer-link:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .footer-cta {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 1rem 2rem;
          border-radius: 2rem;
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          display: inline-block;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .footer-cta:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .footer-note {
          opacity: 0.8;
          font-size: 0.875rem;
        }

        .footer-note p {
          margin-bottom: 0.5rem;
        }

        /* Enhanced Responsive Design */
        @media (max-width: 1024px) {
          .metrics-grid-single,
          .dashboard-metrics-single {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .page-container {
            padding: 0 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .nav-container {
            top: 1rem;
            flex-direction: column;
            gap: 1rem;
            max-width: 95vw;
          }

          .floating-nav {
            width: 100%;
            justify-content: center;
          }

          .nav-pills {
            flex-wrap: nowrap;
            max-width: calc(100vw - 2rem);
            justify-content: flex-start;
            padding: 0.4rem;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .nav-pills::-webkit-scrollbar {
            display: none;
          }

          .nav-pill {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
            flex: none;
            min-width: auto;
          }

          .dark-mode-toggle {
            position: relative;
            top: auto;
            right: auto;
            width: 40px;
            height: 40px;
            font-size: 1rem;
            order: 2;
          }

          .intro-title {
            font-size: 2.5rem;
          }

          .intro-highlights {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .metrics-grid-single,
          .dashboard-metrics-single,
          .projects-grid,
          .experiments-grid {
            grid-template-columns: 1fr;
          }

          .experiment-card.expanded {
            grid-column: 1;
          }

          .meta-row {
            grid-template-columns: 1fr;
          }

          /* Timeline mobile */
          .timeline::before {
            left: 2rem;
          }

          .timeline-item.left .timeline-content,
          .timeline-item.right .timeline-content {
            width: calc(100% - 5rem);
            margin-left: 4rem;
            margin-right: 0;
          }

          .timeline-dot {
            left: 2rem;
          }

          .timeline-item.left .timeline-content::before,
          .timeline-item.right .timeline-content::before {
            left: -24px;
            right: auto;
            border-left-color: var(--bg-card);
            border-right-color: transparent;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding-top: 9rem;
          }

          .nav-container {
            top: 0.5rem;
          }

          .nav-pills {
            padding: 0.3rem;
            max-width: calc(100vw - 1rem);
          }

          .nav-pill {
            padding: 0.5rem 0.8rem;
            font-size: 0.75rem;
          }

          .dark-mode-toggle {
            width: 36px;
            height: 36px;
            font-size: 0.9rem;
          }

          .profile-card,
          .intro-content,
          .skills-container {
            padding: 2rem;
          }

          .avatar-placeholder {
            width: 80px;
            height: 80px;
            font-size: 1.8rem;
          }

          .profile-name {
            font-size: 2rem;
          }

          .intro-title {
            font-size: 2rem;
          }

          .intro-highlights {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .highlight-number {
            font-size: 2rem;
          }

          .skills-sections {
            gap: 2rem;
          }

          .skills-section {
            padding: 1.5rem;
          }
        }
      `}</style>

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} isDark={isDark} setIsDark={setIsDark} />
      {renderPage()}
    </div>
  );
};

export default App;